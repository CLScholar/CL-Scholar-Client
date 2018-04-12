import React, {Component} from 'react';
import { Jumbotron, Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import {ACL_API} from '../../config';
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
    this.findTotalCitations = this.findTotalCitations.bind(this);
    this.findCollaborators = this.findCollaborators.bind(this);
    this.findHindex = this.findHindex.bind(this);
  }

  componentWillMount() {
    let url = `${ACL_API}authors/`;

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

  // Find Hindex of author
  findHindex() {
    let index = 0;
    if(this.state.author_data.hindex.length > 0) {
      index = this.state.author_data.hindex[this.state.author_data.hindex.length-1].index
    }
    return index;
  }

  // Total Citations for card
  findTotalCitations() {
    let totalCitations = 0
    for (const paper of this.state.author_data.papers) {
      totalCitations = totalCitations + paper.citations;
    }
    return totalCitations;
  }

  // Collabs Per paper card
  findCollaborators() {
    let totalCollabs = 0
    for (const paper of this.state.author_data.papers) {
      totalCollabs = totalCollabs + paper.collab_auths.length;
    }
    let collabsPerPaper = totalCollabs/this.state.author_data.papers.length;
    collabsPerPaper = collabsPerPaper.toFixed(2);
    return collabsPerPaper;
  }

  render() {
    let display = null;
    if(this.state.loading === false) {
      display = (
        <div>
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-5">{this.state.author_data.name_list[0]}</h1>
              <Row className="pt-2 stats-row">
                <Col xs="12" md="3">
                  <div className="stat-box">
                    <h3>{this.state.author_data.papers.length}</h3>
                    <p>Publications</p>
                  </div>
                </Col>
                <Col xs="12" md="3">
                  <div className="stat-box">
                    <h3>{this.findTotalCitations()}</h3>
                    <p>Citations</p>
                  </div>
                </Col>
                <Col xs="12" md="3">
                  <div className="stat-box">
                    <h3>{this.findCollaborators()}</h3>
                    <p>Collaborations per paper</p>
                  </div>
                </Col>
                <Col xs="12" md="3">
                  <div className="stat-box">
                    <h3>{this.findHindex()}</h3>
                    <p>H-index</p>
                  </div>
                </Col>
              </Row>
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
                name = {this.state.author_data.name_list[0]}
                id = {this.state.author_data.author_id}
                history = {this.props.history}
                collaborators_list = {this.state.author_data.collaborators_list}
                hindex={this.state.author_data.hindex}
                topics = {this.state.author_data.topics}
                Yearwise_Publication = {this.state.author_data.Yearwise_Publication}
                Yearwise_Citation = {this.state.author_data.Yearwise_Citation}
              />
            </TabPane>
            <TabPane tabId="2">
              <Publications papers={this.state.author_data.papers}/>
            </TabPane>
          </TabContent>

        </div>
      );
    }
    else {
        display = (<PreLoader/>);
    }
    return (
      <div className="author-page">
        {display}
      </div>
    );
  }
}
