import React, { Component } from 'react';
import { Row, Col, Badge, Collapse, Container } from 'reactstrap';
import {Link} from 'react-router-dom';
import {ACL_API} from '../../config';
import axios from 'axios';
import './paper-rows.css';

class PaperRows extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    console.log(this.props.id);
    return (
      <Link className="paper-row" target="_blank" to={`/paper/${this.props.id}`}>
        <Row>
            <Col className="paper" xs="12" md="10">
              <h6>
                <p>{this.props.title}</p>
              </h6>
            </Col>
            <Col className="citations" xs="12" md="2">
              <h6><b>{this.props.citations}</b> Citations</h6>
            </Col>
            <hr className="my-2" />
        </Row>
      </Link>
    );
  }
}

export default PaperRows;
