import React, {Component} from 'react';
import { Jumbotron, Container, Badge, Button} from 'reactstrap';
import {ACL_API} from '../../config';
import PreLoader from '../../components/preloader/preloader';
import PaperRows from '../../components/paper-rows/paper-rows';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './paper.css';

export default class Paper extends Component {
  constructor(props, match) {
    super(props);

    this.state = {
      paper_data: null,
      loading: true
    }

    this.getAuthors = this.getAuthors.bind(this);
    this.getPapers = this.getPapers.bind(this);
  }

  componentWillMount() {
    let url = ACL_API + 'paper/';
    axios.get(url + this.props.match.params._id)
    .then(response => {
      this.setState({
        paper_data: response.data,
        loading: false
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getAuthors() {
    let author_list;
    author_list = this.state.paper_data.authors.map((author) => {
      return (
        <Link target="_blank" key={author.id} to={`/author/${author.id}`}>
          {`${author.name_list[0]} `}
        </Link>
      );
    });

    return author_list;
  }

  getPapers(paperList) {
    if (paperList.length === 0) {
      return "None";
    }
    let paperRows;
    console.log(paperList);
    paperRows = paperList.map((paper_id,i) => {
      return (
        <PaperRows
          key = {paper_id}
          id = {paper_id}
          title = "Some sample title for now"
          citations = '23'
        />
      );
    });
    return paperRows;
  }

  render() {
    let display = null;
    if (this.state.loading) {
      display = (<PreLoader/>);
    }
    else {
      display = (
        <div>
          <Jumbotron>
            <Container>
              <h1 className="h2">{this.state.paper_data.title}</h1>
              <p className="mt-3 lead">Paper</p>
            </Container>
          </Jumbotron>
          <Container className="my-5 paper-container">
            <div className='my-2'><b>Year of Publication: </b><Badge>{this.state.paper_data.year}</Badge></div>
            <div className="coauthors">
              <span><b>Authors : </b></span>
              {this.getAuthors()}
            </div>
            <div className="mt-2">
              <span><b>Summary : </b></span>
              <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                 do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                   dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                   cupidatat non proident, sunt in culpa qui officia deserunt
                   mollit anim id est laborum."</p>
            </div>
            <div className="mt-2">
              <Button href={`http://www.aclweb.org/anthology/${this.props.match.params._id}.pdf`} color="primary" size="lg">
                  Read Full Paper
              </Button>
            </div>
            <h2 className="py-3 mt-3">Cites</h2>
            <div>{this.getPapers(this.state.paper_data.citing)}</div>
            <h2 className="py-3 mt-3">Cited in</h2>
            <div>{this.getPapers(this.state.paper_data.cited)}</div>
          </Container>
        </div>
      );
    }
    return (
      <div className="paper-page">
        {display}
      </div>
    );
  }
}
