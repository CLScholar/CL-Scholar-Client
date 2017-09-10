import React, { Component } from 'react';
import SearchBar from '../../components/search-bar-search/search-bar-search';
import AuthorResults from '../../components/author-results/author-results';
import PaperResults from '../../components/paper-results/paper-results';
import ConferenceResults from '../../components/conference-results/conference-results';
import { Jumbotron, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import './search.css';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      page: 1,
      category: 1,
      activeTab: "1"
    }

    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    // Search returns with some value
    if (this.props.location.state) {
      this.setState({
        search: this.props.location.state.value,
        category: this.props.location.state.category
      })
      if (parseInt(this.props.location.state.category,10) > 2) {
        this.setState({activeTab: "" + (this.props.location.state.category - 1)})
      }
    }
  }

  handleSearchBar(searchState) {
    this.setState({
      search: searchState.search,
      category: searchState.category
    })
    if (searchState.category > 1) {
      this.setState({activeTab: "" + (searchState.category - 1)})
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  // To add client side pagination later
  render() {
    return (
      <div>
        <Jumbotron className="search-container search">
          <SearchBar
            // url={this.props.location.pathname}
            value={this.state.search}
            category={this.state.category}
            searchTerm={(searchState) => this.handleSearchBar(searchState)}
          />
          <Nav tabs className="result-tabs">
            <NavItem>
              <NavLink
                className={this.state.activeTab === '1' ? "active-tab" : null}
                onClick={() => { this.toggle('1'); }}
              >
                Papers
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={this.state.activeTab === '2' ? "active-tab" : null}
                onClick={() => { this.toggle('2'); }}
              >
                Authors
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={this.state.activeTab === '3' ? "active-tab" : null}
                onClick={() => { this.toggle('3'); }}
              >
                Conferences
              </NavLink>
            </NavItem>
          </Nav>
        </Jumbotron>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <PaperResults search={this.state.search} />
          </TabPane>
          <TabPane tabId="2">
            <AuthorResults search={this.state.search} />
          </TabPane>
          <TabPane tabId="3">
            <ConferenceResults search={this.state.search} />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}