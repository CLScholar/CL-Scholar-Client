import React, {Component} from 'react';
import { Jumbotron, Container, Button, Row, Col} from 'reactstrap';
import {ACL_API} from '../../config';
import {data1} from '../../components/data.js';
import PreLoader from '../../components/preloader/preloader';
import PaperRows from '../../components/paper-rows/paper-rows';
import  {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
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
    console.log(this.state.paper_data);
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
              <p className="mt-3">
                Published at : <b>{this.state.paper_data.conference}, {this.state.paper_data.year}</b>
              </p>
            </Container>
          </Jumbotron>
          <Container className="paper-container">
            <Row className="py-5 paper-stats">
              <Col xs="12" md="3">
                <div className="stat-box">
                  <h3>{this.state.paper_data.year}</h3>
                  <p>Publication Year</p>
                </div>
              </Col>
              <Col xs="12" md="3">
                <div className="stat-box">
                  <h3>{this.state.paper_data.cited.length}</h3>
                  <p>Total Citations</p>
                </div>
              </Col>
              <Col xs="12" md="3">
                <div className="stat-box">
                  <h3>2.3</h3>
                  <p>Sentiment Score</p>
                </div>
              </Col>
            </Row>
            <Row className="py-5">
              <Col className="author-col" xs="12" md="4">
                <div className="coauthors">
                  <h3 className="mt-4">Authors</h3>
                  {this.getAuthors()}
                </div>
                <div className="coauthors">
                  <h3 className="mt-4">Affiliations</h3>
                  {this.getAuthors()}
                </div>

              </Col>
              <Col xs="12" md="8">
                <h3 className="mb-5">Citation Trend</h3>

                <LineChart width={620} height={300} data={data1}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <XAxis tickLine={false} dataKey="year"/>
               <YAxis tickLine={false} axisLine={false} />
               <CartesianGrid vertical={false} strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               <Line type="monotone" dataKey="publications" stroke="#8884d8" activeDot={{r: 8}}/>
              </LineChart>

              </Col>
            </Row>
            <div className="my-2">
              <h3 className="mb-2">Abstract</h3>
              <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                 do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                   dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                   cupidatat non proident, sunt in culpa qui officia deserunt
                   mollit anim id est laborum."</p>
            </div>
            <div className="my-2">
              <h3 className="mb-2">Summary</h3>
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
            <h4 className="py-3 mt-2">Cites</h4>
            <div>{this.getPapers(this.state.paper_data.citing)}</div>
            <h4 className="py-3 mt-2">Cited in</h4>
            <div>{this.getPapers(this.state.paper_data.cited)}</div>
            <h4 className="py-3 mt-2">Co Cited</h4>
            <div>{this.getPapers(this.state.paper_data.citing)}</div>
            <h4 className="py-3 mt-2">List of URLS</h4>
            <div><ul>
              <li>http://www.google.com/sfa</li>
              <li>http://www.google.com/sfa</li>
              <li>http://www.google.com/sfa</li>
              <li>http://www.google.com/sfa</li>
              <li>http://www.google.com/sfa</li>
            </ul></div>
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
