import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {ACL_API} from '../../config';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './conference-results.css';


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
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.search !== this.props.search && (nextProps.search)) {
      this.setState({search: nextProps.search}, () => {
        this.getData();
      });
    }
  }

  getData() {
    let url = ACL_API + 'conferences'
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
    conferenceList = conferenceList.map((conference,i) => {
      return (
        <Link key={i} target="_blank" to={`/conference/${conference.conference_id}`}>
          <h3>{conference.name[0]}</h3>
        </Link>
      );
    });
    return conferenceList;
  }

  render() {

    let list = null;
    if (this.state.data) {
      if (this.state.data.length === 0) {
        list  = <h2>Err! no result found</h2>
      }
      else list = this.getConferences();
    }
    else {
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
