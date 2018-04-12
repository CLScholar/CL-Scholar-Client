import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import './author-stats.css';
import  {BarChart, Bar, LineChart, Line, XAxis, YAxis, Label, CartesianGrid, Tooltip, Legend} from 'recharts';
import CollabGraph from '../collabs-graph/collabs-graph';
import {mapping} from '../topicsmap';

export default class AuthorStats extends Component {
  constructor(props) {
    super(props);

    this.sortTopics = this.sortTopics.bind(this);
    this.showTopics = this.showTopics.bind(this);
    this.addNullYear = this.addNullYear.bind(this);
    this.getTopCollabs = this.getTopCollabs.bind(this);
  }

  addNullYear(objects) {
    if (objects.length === 0) {
      return [{year: 2018, number: 0}];
    }
    let min = objects[0].year;
    let max = objects[objects.length - 1].year;

    // Pubications vs year array
    let data = new Array(max-min+1);
    data.fill(0);

    for (const paper of objects) {
      data[paper.year - min] += paper.number;
    }

    let returnData = data.map((yearCount,i) => {
        return (
          {year: min+i, number: yearCount}
        )
      }
    );
    return returnData
  }

  getTopCollabs() {
    let collabs = this.props.collaborators_list.slice(0,10);
    collabs = collabs.map(collab => {
      return <li className='collabItem' key={collab.author_id}><a href={`/aclakg/author/${collab.author_id}`}>{collab.name}</a></li>
    });
    return collabs;
  }

  sortTopics() {
    let items = this.props.topics;
    let length = items.length;
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < (length - i - 1); j++) {
        if(items[j].year > items[j+1].year) {
          var tmp = items[j];
          items[j] = items[j+1];
          items[j+1] = tmp;
        }
      }
    }
    return items;
  }

  showTopics() {
    let items = this.props.topics;
    let barTopics = new Set();
    let topic_data;
    items.forEach(item => {
      for(let topic in item){
        barTopics.add(topic);
      }
    });
    barTopics.delete("year");
    //Converting set to array
    barTopics = [...barTopics];
    barTopics = barTopics.map((topic,i) => {
      topic_data = parseInt(topic,10);
      topic_data = mapping[topic_data];
      return <Bar legendType="none" key={i} dataKey={topic} name={topic_data.name} stackId="a" fill={topic_data.color} />
    });
    return barTopics;
  }

  render() {
    let hindexData = [{year:2018, index:0}];
    if(this.props.hindex.length !== 0) {
      hindexData = this.props.hindex;
    }
    return (
      <section className="author-stats">
        <Container>
          <Row>
            <Col xs="9">
              <h3 className="py-4">Collaborators</h3>
              <CollabGraph
                author = {this.props.name}
                id = {this.props.id}
                source = "author"
                collabs={this.props.collaborators_list} />
              </Col>
              <Col xs="3">
                <h4 className='mt-4 topCollab'>Top Collaborators</h4>
                <ul>{this.getTopCollabs()}</ul>
              </Col>
          </Row>

          <Row className="py-5">
            <Col xs="12" md="6">
              <h3 className="mb-5">Publication Trend</h3>

              <BarChart width={560} height={300} data={this.addNullYear(this.props.Yearwise_Publication)}
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
                 <Bar legendType="none" dataKey="number" fill="#8884d8"/>
               </BarChart>

            </Col>
            <Col xs="12" md="6">
              <h3 className="mb-5">Citation Trend</h3>

              <BarChart width={560} height={300} data={this.addNullYear(this.props.Yearwise_Citation)}
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
                 <Bar legendType="none" dataKey="number" fill="#82ca9d"/>
               </BarChart>

            </Col>
          </Row>
          <Row className="py-5">
            <Col xs="12" md="6">
              <h3 className="mb-5">Temporal growth of H-index</h3>

              <LineChart width={560} height={300} data={hindexData}
                    margin={{top: 5, right: 30, left: 20, bottom: 15}}>
               <XAxis tickLine={false} dataKey="year">
                 <Label offset={-10} position="insideBottom" >
                   Year
                 </Label>
               </XAxis>
               <YAxis tickLine={false} allowDecimals={false} axisLine={false}>
                 <Label angle={270} position='insideLeft'>
                   H-index
                 </Label>
               </YAxis>
               <CartesianGrid vertical={false} strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               <Line legendType="none" type="monotone" dataKey="index"  activeDot={{r: 8}} stroke="#1abc9c" />
             </LineChart>

            </Col>
            <Col xs="12" md="6">
              <h3 className="mb-5">Temporal Distribution of Fields</h3>

              <BarChart width={560} height={300} data={this.sortTopics()}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}} maxBarSize={45}>
               <XAxis dataKey="year"/>
               <YAxis/>
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               {this.showTopics()}
              </BarChart>

            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}
