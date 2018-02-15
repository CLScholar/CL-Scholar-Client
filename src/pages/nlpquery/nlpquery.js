import React, {Component} from 'react';
import { Jumbotron } from 'reactstrap';
import axios from 'axios';
import {ACL_API} from '../../config';
import {InputGroup, InputGroupButton, Input, Container} from 'reactstrap';
import QueryResult from '../../components/queryresult/queryresult';
import './nlpquery.css';

export default class NLPQuery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      data: [],
      status: 'initial'
    }

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.checkKey = this.checkKey.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // Pressing enter triggers search
  checkKey(e) {
    if (e.key === 'Enter') {
      this.search();
    }
  }

  search() {
    this.setState({status: 'searching'});
    let url = ACL_API + 'nlpquery';
    axios.post(url, {
      query: this.state.value,
    })
    .then(response => {
      console.log(response.data);
      this.setState({data: response.data, status: 'searched'})
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Jumbotron className="search-container">
          <h3 className="display-5">Enter a query</h3>
          <p className="lead">
            For Example Try <i>'Enlist the papers published by Animesh Mukherjee'</i>
           </p>
           <Container className='search-bar'>
             <InputGroup>
               <Input
                 placeholder="Enter your query"
                 value={this.state.value}
                 onChange={this.handleChange}
                 onKeyDown={this.checkKey}
               />
               <InputGroupButton onClick={this.search} color="primary">Search</InputGroupButton>
             </InputGroup>
           </Container>
        </Jumbotron>
        <QueryResult
          status={this.state.status}
          search={this.state.value}
          data={this.state.data}
        />
      </div>
    );
  }
}
