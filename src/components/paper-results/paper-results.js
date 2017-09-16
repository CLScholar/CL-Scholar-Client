import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {ACL_API} from '../../config';
import axios from 'axios';
import PaperRows from '../paper-rows/paper-rows';
import './paper-results.css';

class PaperResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      data: null
    }

    this.getPapers = this.getPapers.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.setState({search: this.props.search})
  }

  componentDidMount() {
    if (!this.state.search) {
      this.setState({search: 'a'}, () => {
        this.getData();
      });
    }
    else {
      this.getData();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.search !== this.props.search && (nextProps.search)) {
      this.setState({search: nextProps.search}, () => {
        this.getData();
      });
    }
  }

  getData() {
    let url = ACL_API + 'papers';
    if (!this.state.search) {
      this.setState({search: 'a'});
    }
    axios.get(url, {
      params: {
        title: this.state.search
      }
    })
    .then(response => {
      this.setState({data: response.data});
    })
    .catch(error => {
      console.log(error);
    });
  }

  getPapers() {
    let paperList = this.state.data;
    paperList = paperList.map((paper,i) => {
      return (
        <PaperRows
          key = {paper.paper_id}
          id = {paper.paper_id}
          title = {paper.title}
          year = {paper.year}
          citations = {paper.cited.length}
        />
      );
    });
    return paperList;
  }

  render() {

    let list = null;
    if (this.state.data) {
      list = this.getPapers();
    } else {
      list = <h1>Please wait, loading</h1>
    }
    return (
      <section className="paper-results mt-0 py-5">
        <Container>
          <div className="py-3">
            {list}
          </div>
        </Container>

      </section>
    );
  }
}


export default PaperResults;
