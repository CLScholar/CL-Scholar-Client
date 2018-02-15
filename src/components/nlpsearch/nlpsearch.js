import React, {Component} from 'react';
import axios from 'axios';
import {ACL_API} from '../../config';
import QueryResult from '../queryresult/queryresult';
// import './nlpquery.css';

export default class NLPSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      data: [],
      status: 'initial'
    }

  }

  componentWillMount() {
    this.setState({search: this.props.search})
  }

  componentDidMount() {
    console.log(this.props.search);
      this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.search !== this.props.search) {
      this.setState({search: nextProps.search}, () => {
        this.getData();
      });
    }
  }

  getData() {
    // Search only if there is a valid input
    console.log("In getData");
    if (this.state.search.length > 2) {
      this.setState({status: 'searching'});
      let url = ACL_API + 'nlpquery';
      console.log(url);
      axios.post(url, {
        query: this.state.search,
      })
      .then(response => {
        console.log(response.data);
        this.setState({data: response.data, status: 'searched'})
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  render() {
    return (
        <QueryResult
          status={this.state.status}
          search={this.state.search}
          data={this.state.data}
        />
    );
  }
}
