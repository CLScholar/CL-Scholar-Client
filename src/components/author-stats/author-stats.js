import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import './author-stats.css';
import  {BarChart, Bar, LineChart, Line, XAxis, YAxis, Label, CartesianGrid, Tooltip, Legend} from 'recharts';
import CollabGraph from '../collabs-graph/collabs-graph';
import {Link} from 'react-router-dom';
import {mapping} from '../topicsmap';

// console.log(window.screen.width, window.screen.height);

export default class AuthorStats extends Component {
  constructor(props) {
    super(props);

    // this.findYearWiseData = this.findYearWiseData.bind(this);
    this.sortTopics = this.sortTopics.bind(this);
    this.showTopics = this.showTopics.bind(this);
  }

  // Year Wise Data for plotting in graph
  // findYearWiseData(type) {
  //   let data;
  //   let plotdata = [];
  //   let plotpoint;
  //   let yearcounter = 0;
  //   let key = "";
  //
  //   if (type === 2) {
  //     data = this.props.hindex;
  //     key = "hindex";
  //   }
  //   else if (type === 1) {
  //     data = this.props.Yearwise_Publication;
  //     key = "publications";
  //   }
  //   else {
  //     data = this.props.Yearwise_Citation;
  //     key = "citations";
  //   }
  //
  //   for (let year in data) {
  //     if (!yearcounter) {
  //       yearcounter = year // Base year
  //     }
  //     while (yearcounter != year) {
  //       plotpoint  = {year: yearcounter, [key]: 0}
  //       plotdata.push(plotpoint);
  //       yearcounter++;
  //     }
  //     plotpoint  = {year: year, [key]: data[year]}
  //     plotdata.push(plotpoint);
  //     yearcounter++;
  //     }
  //   return plotdata;
  // }


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
    barTopics = barTopics.map(topic => {
      topic_data = parseInt(topic,10);
      topic_data = mapping[topic_data];
      return <Bar dataKey={topic} name={topic_data.name} stackId="a" fill={topic_data.color} />
    });
    return barTopics;
  }

  render() {
    return (
      <section className="author-stats">
        <Container>
          {/* <h1 className="py-1">Author Stats</h1> */}
          <h3 className="py-4">Collabotators</h3>
          <CollabGraph
            history = {this.props.history}
            author = {this.props.name}
            id = {this.props.id}
            source = "author_stats"
            collabs={this.props.collaborators_list} />
          <Row className="py-5">
            <Col xs="12" md="6">
              <h3 className="mb-5">YearWise Publications</h3>

              <BarChart width={560} height={300} data={this.props.Yearwise_Citation}
                      margin={{top: 5, right: 30, left: 20, bottom: 15}}>
                 <XAxis tickLine={false} dataKey="year">
                   <Label offset={-10} position="insideBottom" >
                     Year
                   </Label>
                 </XAxis>
                 <YAxis tickLine={false} axisLine={false}>
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
              <h3 className="mb-5">YearWise Citations</h3>

              <BarChart width={560} height={300} data={this.props.Yearwise_Publication}
                      margin={{top: 5, right: 30, left: 20, bottom: 15}}>
                 <XAxis tickLine={false} dataKey="year">
                   <Label offset={-10} position="insideBottom" >
                     Year
                   </Label>
                 </XAxis>
                 <YAxis tickLine={false} axisLine={false}>
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
              <h3 className="mb-5">H-index vs Year</h3>

              <LineChart width={560} height={300} data={this.props.hindex}
                    margin={{top: 5, right: 30, left: 20, bottom: 15}}>
               <XAxis tickLine={false} dataKey="year">
                 <Label offset={-10} position="insideBottom" >
                   Year
                 </Label>
               </XAxis>
               <YAxis tickLine={false} axisLine={false}>
                 <Label angle={270} position='insideLeft'>
                   Hindex
                 </Label>
               </YAxis>
               <CartesianGrid vertical={false} strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               <Line legendType="none" type="monotone" dataKey="index"  activeDot={{r: 8}} stroke="#1abc9c" />
             </LineChart>

            </Col>
            <Col xs="12" md="6">
              <h3 className="mb-5">Topics vs Year </h3>

              <BarChart width={560} height={300} data={this.sortTopics()}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}>
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
