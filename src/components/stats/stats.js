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
              <h1>42k+</h1>
              <p>Papers</p>
            </Col>
            <Col xs="12" md="4">
              <h1>33k+</h1>
              <p>Authors</p>
            </Col>
            <Col xs="12" md="4">
              <h1>33</h1>
              <p>Venues</p>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}
