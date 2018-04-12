import React, {Component} from 'react';
import { Jumbotron, Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import  {BarChart, Bar, XAxis, YAxis, Label, CartesianGrid, Tooltip, Legend} from 'recharts';
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
    this.getTopCollabs = this.getTopCollabs.bind(this);
  }

  componentWillMount() {
    let url = `${ACL_API}conference/`;

    axios.get(url + this.props.match.params._id)
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

  getTopCollabs() {
    let collabs = this.state.conference_data.collaborators_list.slice(0,10);
    collabs = collabs.map(collab => {
      return <li className='collabItem' key={collab.conference_id}><a href={`/aclakg/conference/${collab.conference_id}`}>{collab.name}</a></li>
    });
    return collabs;
  }

  findImpact() {
    let totalImpact = 0
    let count = 0
    for (let object of this.state.conference_data.impact) {
      totalImpact = totalImpact + object.value
      count = count + 1;
    }
    if(count !== 0 ){
      return (totalImpact/count).toFixed(2);
    }
    else {
      return 0.00;
    }
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
                    <p>Publications</p>
                  </div>
                </Col>
                <Col xs="12" md="4">
                  <div className="stat-box">
                    <h3>{this.findTotalCitations()}</h3>
                    <p>Citations</p>
                  </div>
                </Col>
                <Col xs="12" md="4">
                  <div className="stat-box">
                    <h3>{this.findImpact()}</h3>
                    <p>Average Impact</p>
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
                  Conference Stats
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

                <Row>
                  <Col xs="9">
                    <h3 className="py-4">Citing Communities</h3>
                    <CollabGraph
                      history = {this.props.history}
                      author = {this.state.conference_data.name[0]}
                      id = {this.state.conference_data.conference_id}
                      source = "conference"
                      collabs={this.state.conference_data.collaborators_list} />
                    </Col>
                    <Col xs="3">
                      <h3 className='mt-4 topCollab'>Top Collaborators</h3>
                      <ul>{this.getTopCollabs()}</ul>
                    </Col>
                </Row>
                <Row className="py-5">
                  <Col xs="12" md="6">
                    <h3 className="mb-5">Citation Trend</h3>

                    <BarChart width={560} height={300} data={this.state.conference_data.Yearwise_Citation}
                      margin={{top: 5, right: 30, left: 20, bottom: 15}} maxBarSize={45}>
                      <XAxis tickLine={false} dataKey="year">
                        <Label offset={-10} position="insideBottom" >
                          Year
                        </Label>
                      </XAxis>
                      <YAxis tickLine={false} allowDecimals={false} axisLine={false}>
                        <Label angle={270} position='insideLeft' style={{ textAnchor: 'middle' }}>
                          Citations
                        </Label>
                      </YAxis>
                      <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Legend />
                      <Bar legendType="none" dataKey="number" fill="#8884d8"/>
                    </BarChart>

                  </Col>
                  <Col xs="12" md="6">
                    <h3 className="mb-5">Publication Trend</h3>

                    <BarChart width={560} height={300} data={this.state.conference_data.Yearwise_Publication}
                      margin={{top: 5, right: 30, left: 20, bottom: 15}} maxBarSize={45}>
                      <XAxis tickLine={false} dataKey="year">
                        <Label offset={-10} position="insideBottom" >
                          Year
                        </Label>
                      </XAxis>
                      <YAxis tickLine={false} allowDecimals={false} axisLine={false}>
                        <Label angle={270} position='insideLeft' style={{ textAnchor: 'middle' }}>
                          Publications
                        </Label>
                      </YAxis>
                      <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Legend />
                      <Bar legendType="none" dataKey="number" fill="#82ca9d"/>
                    </BarChart>

                  </Col>
                </Row>
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
