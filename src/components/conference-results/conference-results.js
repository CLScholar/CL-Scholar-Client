import React, {Component} from 'react';
import {Container} from 'reactstrap';
import axios from 'axios';
import PaperRows from '../paper-rows/paper-rows';
import './conference-results.css';

// MAKE ENV vars remove hardcoded URLs
const ACL_API = 'http://localhost:4000/api/';

class ConferenceResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      data: null
    }

    this.getConferences = this.getConferences.bind(this);
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
    let url = ACL_API + 'papers/conferences';
    if (this.state.search === '' ) {
      this.setState({search: 'a'});
    }
    axios.get(url, {
      params: {
        name: this.state.search
      }
    })
    .then(response => {
      this.setState({data: response.data});
    })
    .catch(error => {
      console.log(error);
    });
  }

  getConferences() {
    let conferenceList = this.state.data;
    conferenceList = conferenceList.map((paper,i) => {
      return (
        // Will make this component ??
        <div className="paper-conf" key={i}>
          <h6><b>Conference: </b>{paper.conference}</h6>
          <hr className="mt-1"/>
          <PaperRows
            key = {paper.paper_id}
            id = {paper.paper_id}
            title = {paper.title}
            year = {paper.year}
            citations = {paper.cited.length}
          />
        </div>
      );
    });
    return conferenceList;
  }

  render() {

    let list = null;
    if (this.state.data) {
      list = this.getConferences();
    } else {
      list = <h1>Please wait, loading</h1>
    }
    return (
      <section className="conference-results mt-0 py-5">
        <Container>
          <div className="py-3">
            {list}
          </div>
        </Container>

      </section>
    );
  }
}


export default ConferenceResults;
