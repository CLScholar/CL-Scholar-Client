import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import './graphs.css';
import {paper_stats, author_stats} from '../data';

export default class Graphs extends Component {
  render() {
    return (
      <section className="graphs py-5">
        <Container>
          <h2 className="my-0 py-3 mb-3">Stats over the years</h2>
          <hr className="my-2" />
          <Container className="chart1 py-4">
            <Row>
              <Col className="info" md="4">
                <h1>42,000</h1>
                <p className="subheading">Papers</p>
                <p>There has been about <b>166% increase</b> in number of publications
                just in the last decade.
                </p>
              </Col>
              <Col md="8">
                <BarChart width={700} height={300} data={paper_stats}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                 <XAxis tickLine={false} dataKey="year"/>
                 <YAxis tickLine={false} axisLine={false} />
                 <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="Publications" fill="#4EB2F5" />
                </BarChart>
              </Col>
            </Row>
          </Container>
          <hr className="my-2" />
          <Container className="chart2 py-4">
            <Row>
              <Col className="info" md="4">
                <h1>33,300</h1>
                <p className="subheading">Authors</p>
                <p>The increase in new authors has been <b>more than double </b>
                  this decade than that of previous decade
                </p>
              </Col>
              <Col md="8">
                <BarChart width={700} height={300} data={author_stats}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                 <XAxis tickLine={false} dataKey="year"/>
                 <YAxis tickLine={false} axisLine={false} />
                 <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="Authors" fill="#2ecc71" />
                </BarChart>
              </Col>
            </Row>
          </Container>
        </Container>
      </section>
    );
  }
}
