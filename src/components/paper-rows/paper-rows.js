import React, { Component } from 'react';
import { Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import './paper-rows.css';

class PaperRows extends Component {

  render() {
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
