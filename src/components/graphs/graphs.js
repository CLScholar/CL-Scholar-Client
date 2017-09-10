import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import './graphs.css';
import {data1, data2} from '../data'; // ONE IS DUMMY DATA

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
                <h1>48000</h1>
                <p className="subheading">Papers and increasing</p>
                <p>Over the last 3 years the average increase has been of
                  <b> 156% more</b> than the previous 3 years
                </p>
              </Col>
              <Col md="8">
                <BarChart width={700} height={300} data={data1}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                 <XAxis tickLine={false} dataKey="year"/>
                 <YAxis tickLine={false} axisLine={false} />
                 <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="publications" fill="#4EB2F5" />
                </BarChart>
              </Col>
            </Row>
          </Container>
          <hr className="my-2" />
          <Container className="chart2 py-4">
            <Row>
              <Col className="info" md="4">
                <h1>27000</h1>
                <p className="subheading">authors database</p>
                <p>The increase in new authors has been <b>more than double </b>
                  this year than the previous year
                </p>
              </Col>
              <Col md="8">
                <BarChart width={700} height={300} data={data2}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                 <XAxis tickLine={false} dataKey="name"/>
                 <YAxis tickLine={false} axisLine={false} />
                 <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                 <Tooltip/>
                 <Legend />
                 <Bar dataKey="views" fill="#2ecc71" />
                </BarChart>
              </Col>
            </Row>
          </Container>
        </Container>
      </section>
    );
  }
}
