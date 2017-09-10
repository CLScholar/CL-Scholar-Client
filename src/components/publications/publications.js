import React from 'react';
import { Container } from 'reactstrap';
import PaperRows from '../paper-rows/paper-rows';
import './publications.css';

const Publications = (props) => {

  const {papers} = props;
  let paperslist = papers.map((paper) => {
  return (
      <PaperRows
        key = {paper.paper_id}
        id = {paper.paper_id}
        title = {paper.paper_title}
        year = {paper.paper_year}
        citations = {paper.citations}
      />
    );
  });

  return (
    <section className="publications py-5">
      <Container>
        <h1 className="py-3 mb-4">Publications</h1>
        {paperslist}
      </Container>
    </section>
  );
}

export default Publications;
