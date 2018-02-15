import React, {Component} from 'react';
import { Jumbotron, Container, Button, Row, Col} from 'reactstrap';
import {ACL_API} from '../../config';
import PreLoader from '../../components/preloader/preloader';
import PaginatedPaper from '../../components/paginated-papers/paginated-papers';
import  {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';
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
    this.getAffiliations = this.getAffiliations.bind(this);
    this.getUrls = this.getUrls.bind(this);
    this.sortYear = this.sortYear.bind(this);
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

  sortYear() {
    let items = this.state.paper_data.citation_trend;
    let length = items.length;
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < (length - i - 1); j++) {
        if(items[j].year > items[j+1].year) {
          var tmp = items[j];
          items[j] = items[j+1];
          items[j+1] = tmp;
        }
      }
    }
    return items;
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

  getAffiliations() {
    let affiliations;
    affiliations = this.state.paper_data.affiliations.map((affiliation,i) => {
      return (
        <li key={i}>{affiliation}</li>
      );
    });
    return affiliations;
  }

  getUrls() {
    if (this.state.paper_data.urls.length === 0) {
      return "No URLs found";
    }
    let urls;
    urls = this.state.paper_data.urls.map((url,i) => {
      return (
        <li key={i}>{url}</li>
      );
    });
    urls.pop() //Removing last element due to defect in json as of now
    return urls;
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
              <Row className="pt-2 paper-stats stats-row">
                <Col xs="12" md="3">
                  <div className="stat-box">
                    <h3>{this.state.paper_data.year}</h3>
                    <p>Publication Year</p>
                  </div>
                </Col>
                <Col xs="12" md="3">
                  <div className="stat-box">
                    <h3>{this.state.paper_data.citations}</h3>
                    <p>Total Citations</p>
                  </div>
                </Col>
                <Col xs="12" md="3">
                  <div className="stat-box">
                    <h3>{this.state.paper_data.sentiment_score}</h3>
                    <p>Sentiment Score</p>
                  </div>
                </Col>
              </Row>
              <Row className="meta-paper">
                <div className="mt-3">
                  Published at : <b>{this.state.paper_data.conference}, {this.state.paper_data.year}</b>
                </div>
                <div className="mt-3 coauthors">
                  Authors :
                  {this.getAuthors()}
                </div>
                <div className="mt-3 coauthors">
                  Affiliations :
                  <b>{this.getAffiliations()}</b>
                </div>
              </Row>

            </Container>
          </Jumbotron>
          <Container className="paper-container">
            <Row className="py-5 text-center">
              <h3 className="mb-5">Citation Trend</h3>
              <BarChart width={1080} height={300} data={this.sortYear()}
                      margin={{top: 5, right: 30, left: 20, bottom: 15}}>
                <XAxis tickLine={false} dataKey="year">
                  <Label offset={-10} position="insideBottom" >
                    Year
                  </Label>
                </XAxis>
                <YAxis tickLine={false} axisLine={false}>
                  <Label angle={270} position='insideLeft' style={{ textAnchor: 'middle' }}>
                    Citations
                  </Label>
                </YAxis>
               <CartesianGrid vertical={false} strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               <Bar legendType="none" dataKey="citation" fill="#8884d8"/>
             </BarChart>
            </Row>
            <div className="my-2">
              <h3 className="mb-2">Abstract</h3>
              <p>{this.state.paper_data.abstract || "None"}</p>
            </div>
            <div className="my-2">
              <h3 className="mb-2">Summary</h3>
              <p>{this.state.paper_data.summary || "None"}</p>
            </div>
            <div className="mt-2">
              <Button href={`http://www.aclweb.org/anthology/${this.props.match.params._id}.pdf`} color="primary" size="lg">
                  Read Full Paper
              </Button>
            </div>
            <h4 className="py-3 mt-2">References</h4>
            <PaginatedPaper paperList = {this.state.paper_data.citing} />
            <h4 className="py-3 mt-2">Cited by</h4>
            <PaginatedPaper paperList = {this.state.paper_data.cited} />
            <h4 className="py-3 mt-2">Co Cited</h4>
            <PaginatedPaper paperList = {this.state.paper_data.cocited} />
            <h4 className="py-3 mt-2">List of URLS</h4>
            <div className="url-list"><ul>{this.getUrls()}</ul></div>
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
