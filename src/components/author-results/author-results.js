import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import {ACL_API} from '../../config';
import axios from 'axios';
import './author-results.css';

class AuthorResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      data: null
    }

    this.getAuthors = this.getAuthors.bind(this);
    this.getData = this.getData.bind(this);
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
    let url = ACL_API + 'authors'
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

  getAuthors() {
    let authorList = this.state.data;
    authorList = authorList.map((author,i) => {
      return (
        // Will make this component
        <Link key={i} to={`/author/${author.author_id}`}>
          <h3>{author.name_list[0]}</h3>
        </Link>
      );
    });
    return authorList;
  }

  render() {
    let list = null;
    if (this.state.data) {
      if (this.state.data.length === 0) {
        list  = <h2>Err! no result found</h2>
      }
      else list = this.getAuthors();
    }
    else {
      list = <h1>Please wait, loading</h1>
    }
    return (
      <section className="author-results mt-0 py-5">
        <Container>
          <div className="py-3">
            {list}
          </div>
        </Container>

      </section>
    );
  }
}


export default AuthorResults;
