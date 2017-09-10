import React, {Component} from 'react';
import { Jumbotron, Container, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Publications from '../../components/publications/publications';
import AuthorStats from '../../components/author-stats/author-stats';
import PreLoader from '../../components/preloader/preloader';
import axios from 'axios';
import './author.css';

export default class Author extends Component {
  constructor(props, match) {
    super(props);

    this.state = {
      author_data: null,
      loading: true,
      activeTab: '1'
    }

    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    let url = 'http://localhost:4000/api/authors/';

    axios.get(url + this.props.match.params._id)
    .then(response => {
      this.setState({
        author_data: response.data,
        loading: false
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {

    let display = null;
    if (this.state.loading) {
      display = (<PreLoader/>);
    }
    else {
      display = (
        <div>
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-4">{this.state.author_data.name_list[0]}</h1>
              <p className="lead">Author</p>
            </Container>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === '1' ? "active-tab" : null}
                  onClick={() => { this.toggle('1'); }}
                >
                  Author Stats
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === '2' ? "active-tab" : null}
                  onClick={() => { this.toggle('2'); }}
                >
                  Publications
                </NavLink>
              </NavItem>
            </Nav>
          </Jumbotron>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <AuthorStats
                papers={this.state.author_data.papers}
                hindex={this.state.author_data.hindex}
                topics = {this.state.author_data.topics}
              />
            </TabPane>
            <TabPane tabId="2">
              <Publications papers={this.state.author_data.papers}/>
            </TabPane>
          </TabContent>

        </div>
      );
    }
    return (
      <div className="author-page">
        {display}
      </div>
    );
  }
}
