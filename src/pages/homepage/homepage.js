import React, {Component} from 'react';
import SearchBar from '../../components/search-bar-homepage/search-bar-homepage';
import About from '../../components/about/about';
import Stats from '../../components/stats/stats';
import Graphs from '../../components/graphs/graphs';
import { Jumbotron } from 'reactstrap';
import './homepage.css';

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="search-container">
          <h1 className="display-5">42,000 NLP Research Papers and counting</h1>
          <p className="lead">
            A Fully Automated Interactive Engine for Analysis of Research Works
           </p>
          <SearchBar/>
        </Jumbotron>
        <About />
        <Stats />
        <Graphs />
      </div>
    );
  }
}
