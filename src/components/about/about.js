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
            Welcome to the IIT Kharagpur's ACL Anthology
            Network (All About NLP) interface. Here we have collected information
            regarding all of the papers included in the many ACL venues. From
            those papers, we have created several networks, including paper
            citation, author citation, and author collaboration. Click here to
            learn more about the project. The network is currently built using
            ACL papers. This includes all papers up to and including those
            published in 2014 which were successfully processed. Feel free to
            visit The ACL Anthology to browse what is available.
          </p>
        </Container>
      </section>
    );
  }
}
