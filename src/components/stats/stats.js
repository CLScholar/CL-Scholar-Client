import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import './stat.css';

export default class Stats extends Component {
  render() {
    return (
      <Container fluid className="stats py-5">
        <Container className="py-3">
          <Row>
            <Col xs="12" md="4">
              <h1>45k+</h1>
              <p>Papers in database</p>
            </Col>
            <Col xs="12" md="4">
              <h1>38k+</h1>
              <p>Authors</p>
            </Col>
            <Col xs="12" md="4">
              <h1>18</h1>
              <p>Conferences covered</p>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}
