import React, { Component } from 'react';
import { Row, Col, Badge, Collapse, Container } from 'reactstrap';
import {Link} from 'react-router-dom';
import {ACL_API} from '../../config';
import axios from 'axios';
import './paper-rows.css';

class PaperRows extends Component {
  constructor(props) {
    super(props);

    this.state = { collapse: false, authors: "Loading...", loaded: false};
    this.toggle = this.toggle.bind(this);
    this.getPaperAuthors = this.getPaperAuthors.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse }, () => {
      if(this.state.collapse && !this.state.loaded) {
        this.getPaperAuthors();
        this.setState({loaded: true});
      }
    });
  }

  getPaperAuthors() {
    if(this.state.collapse) {
      let url = `${ACL_API}authors/collabs/${this.props.id}`
      axios.get(url)
      .then(response => {
        let author_list = response.data.authors;
        author_list = author_list.map((author) => {
          return (
            <Link target="_blank" key={author.id} to={`/author/${author.id}`}>
              {`${author.name_list[0]} `}
            </Link>
          );
        });
        this.setState({authors: author_list});
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  render() {
    return (
        <Row onClick={this.toggle}>
            <Col className="paper" xs="12" md="10">
              <h6>
                {/* <a target="_blank" href={`http://www.aclweb.org/anthology/${this.props.id}.pdf`}>
                  {this.props.title}
                </a> */}
                <p>{this.props.title}</p>
              </h6>
            </Col>
            <Col className="citations" xs="12" md="2">
              <h6><b>{this.props.citations}</b> Citations</h6>
            </Col>
            <Collapse isOpen={this.state.collapse}>
              <Container className="toggled">
                <div><b>Year of Publication: </b><Badge>{this.props.year}</Badge></div>
                <div className="coauthors">
                  <span><b>Authors : </b></span>
                  {this.state.authors}
                </div>
                <div className="mt-2">
                  <a target="_blank" href={`http://www.aclweb.org/anthology/${this.props.id}.pdf`}>
                    Read Paper
                  </a>
                </div>
              </Container>
            </Collapse>
            <hr className="my-2" />
        </Row>
    );
  }
}

export default PaperRows;
