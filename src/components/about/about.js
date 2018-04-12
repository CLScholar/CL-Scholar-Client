import React, {Component} from 'react';
import {Container} from 'reactstrap';
import './about.css';

export default class About extends Component {
  render() {
    return (
      <section className="about mt-0 py-5">
        <Container>
          <h2 className="my-0 py-3">About Us</h2>
          <p className="py-3">
            We present CL Scholar, the ACL Anthology knowledge graph miner to
            facilitate high-quality search and exploration of current research
            progress in the computational linguistics community. It
            periodically crawls, indexes and processes new incoming articles
            in a completely automated fashion. The current system utilizes both
            textual and network information for knowledge graph construction.
            As an additional novel initiative, CL Scholar supports more than
            1200 scholarly natural language queries along with standard
            keyword-based search on constructed knowledge graph.
          </p>
        </Container>
      </section>
    );
  }
}
