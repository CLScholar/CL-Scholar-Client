import React, {Component} from 'react';
import { Jumbotron, Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import {ACL_API} from '../../config';
import Publications from '../../components/publications/publications';
// import AuthorStats from '../../components/author-stats/author-stats';
import PreLoader from '../../components/preloader/preloader';
import CollabGraph from '../../components/collabs-graph/collabs-graph';
import axios from 'axios';
import './conference.css';

export default class Conference extends Component {
  constructor(props, match) {
    super(props);

    this.state = {
      conference_data: null,
      loading: true,
      activeTab: '1'
    }

    this.toggle = this.toggle.bind(this);
    this.findTotalCitations = this.findTotalCitations.bind(this);
    this.findImpact = this.findImpact.bind(this);
  }

  componentWillMount() {
    let url = `${ACL_API}conference/`;

    axios.get(url + 11)
    .then(response => {
      this.setState({
        conference_data: response.data,
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

  // Total Citations for card
  findTotalCitations() {
    let totalCitations = 0
    for (const cit_data of this.state.conference_data.Yearwise_Citation) {
      totalCitations = totalCitations + cit_data.number;
    }
    return totalCitations;
  }

  findImpact() {
    let totalImpact = 0
    for (let year in this.state.conference_data.impact) {
      totalImpact = totalImpact + this.state.conference_data.impact[year]
    }
    return totalImpact.toFixed(2);
  }

  render() {
    let display = null;
    if(this.state.loading === false) {
      display = (
        <div>
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-5">{this.state.conference_data.name[0]}</h1>
              <Row className="pt-2 stats-row">
                <Col xs="12" md="4">
                  <div className="stat-box">
                    <h3>{this.state.conference_data.papers.length}</h3>
                    <p>Pulished Papers</p>
                  </div>
                </Col>
                <Col xs="12" md="4">
                  <div className="stat-box">
                    <h3>{this.findTotalCitations()}</h3>
                    <p>Total Citations</p>
                  </div>
                </Col>
                <Col xs="12" md="4">
                  <div className="stat-box">
                    <h3>{this.findImpact()}</h3>
                    <p>Gross Impact</p>
                  </div>
                </Col>
              </Row>
              <h5 className="mb-3">Last held : {this.state.conference_data.last_held}</h5>
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
              <Container>
                {/* <h1 className="py-1">Author Stats</h1> */}
                <h3 className="py-4">Collabotators</h3>
                <CollabGraph
                  history = {this.props.history}
                  author = {this.state.conference_data.name[0]}
                  id = {this.state.conference_data.conference_id}
                  source = "conference"
                  collabs={this.state.conference_data.collaborators_list} />

              </Container>
            </TabPane>
            <TabPane tabId="2">
              <Publications papers={this.state.conference_data.papers}/>
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
