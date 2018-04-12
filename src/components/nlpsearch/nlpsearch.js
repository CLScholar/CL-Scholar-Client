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
    if (this.state.search.length > 1) {
      this.setState({status: 'searching'});
      let url = ACL_API + 'nlpquery';
      axios.post(url, {
        query: this.state.search,
      })
      .then(response => {
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
          singleEntity={this.props.singleEntity}
          status={this.state.status}
          search={this.state.search}
          data={this.state.data}
        />
    );
  }
}
