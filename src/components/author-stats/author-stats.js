import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import './author-stats.css';
import  {BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

// console.log(window.screen.width, window.screen.height);

export default class AuthorStats extends Component {
  constructor(props) {
    super(props);

    this.findCollaborators = this.findCollaborators.bind(this);
    this.findYearWiseData = this.findYearWiseData.bind(this);
    this.findTotalCitations = this.findTotalCitations.bind(this);
    this.allCollabs = this.allCollabs.bind(this);
  }

  findTotalCitations() {
    let totalCitations = 0
    for (const paper of this.props.papers) {
      totalCitations = totalCitations + paper.citations;
    }
    return totalCitations;
  }

  findCollaborators() {
    let totalCollabs = 0
    for (const paper of this.props.papers) {
      totalCollabs = totalCollabs + paper.collab_auths.length;
    }
    // Finding Collabs per paper
    let collabsPerPaper = totalCollabs/this.props.papers.length;
    collabsPerPaper = collabsPerPaper.toFixed(2);
    return collabsPerPaper;
  }

  // Year Wise Citation for now sees that paper of which year has been cited
  // how many times. We need to make chart instead of in which year a particular
  // paper was cited

  // Year Wise Data for plotting in graph
  findYearWiseData(type) {
    let min = this.props.papers[0].paper_year;
    let max = this.props.papers[0].paper_year;

    for (const paper of this.props.papers) {
      if (paper.paper_year < min) {
        min = paper.paper_year;
      }
      if (paper.paper_year > max) {
        max = paper.paper_year;
      }
    }

    // Pubications vs year array
    let yearPublications = new Array(max-min+1);
    yearPublications.fill(0);

    // Citation vs year array
    let yearCitations = new Array(max-min+1);
    yearCitations.fill(0);

    for (const paper of this.props.papers) {
      yearCitations[paper.paper_year - min] += paper.citations;
      yearPublications[paper.paper_year - min]++;
    }

    let citationData = yearCitations.map((yearCount,i) => {
        return (
          {year: min+i, citations: yearCount}
        )
      }
    );

    let publicationData = yearPublications.map((yearCount,i) => {
        return (
          {year: min+i, publications: yearCount}
        )
      }
    );

    if(type === 1) {
      return publicationData;
    }
    else {
      return citationData;
    }
  }

  // H-index vs Year
  findHIndex(gross = 0) {
    console.log(this.props.hindex)
    let hindex = this.props.hindex;

    hindex = hindex.sort((a, b) => {
      return parseFloat(a.year) - parseFloat(b.year);
    });

    if(gross) {
      return hindex[hindex.length-1].index;
    }
    return hindex;
  }

  // Display all Collabotators
  allCollabs() {
    let collabs = [];
    for (const paper of this.props.papers) {
      collabs = collabs.concat(paper.collab_auths);
    }
    collabs = collabs.map(auth => {
      return <span className="px-2">{auth}</span>
    });
    return collabs;
  }

  render() {
    return (
      <section className="author-stats">
        <Container>
          {/* <h1 className="py-1">Author Stats</h1> */}
          <Row className="py-5">
            <Col xs="12" md="3">
              <div className="stat-box">
                <h3>{this.props.papers.length}</h3>
                <p>Pulished Papers</p>
              </div>
            </Col>
            <Col xs="12" md="3">
              <div className="stat-box">
                <h3>{this.findTotalCitations()}</h3>
                <p>Total Citations</p>
              </div>
            </Col>
            <Col xs="12" md="3">
              <div className="stat-box">
                <h3>{this.findCollaborators()}</h3>
                <p>Collaborators per paper</p>
              </div>
            </Col>
            <Col xs="12" md="3">
              <div className="stat-box">
                <h3>{this.findHIndex(1)}</h3>
                <p>Gross H-index</p>
              </div>
            </Col>
          </Row>
          <h3 className="mb-5">Collabotators</h3>
          <Row>
            <p>Tore Amble&nbsp;&nbsp; Jan Hajic &nbsp;&nbsp;  Sharon Flank &nbsp;&nbsp;  Jiang Chen</p>
            {/* <p>{this.allCollabs()}</p> */}
          </Row>
          <Row className="py-5">
            <Col xs="12" md="6">
              <h3 className="mb-5">YearWise Publications</h3>

              <LineChart width={560} height={300} data={this.findYearWiseData(1)}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
             <XAxis tickLine={false} dataKey="year"/>
             <YAxis tickLine={false} axisLine={false} />
             <CartesianGrid vertical={false} strokeDasharray="3 3"/>
             <Tooltip/>
             <Legend />
             <Line type="monotone" dataKey="publications" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>

            </Col>
            <Col xs="12" md="6">
              <h3 className="mb-5">YearWise Citations</h3>

              <LineChart width={560} height={300} data={this.findYearWiseData(2)}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
             <XAxis tickLine={false} dataKey="year"/>
             <YAxis tickLine={false} axisLine={false} />
             <CartesianGrid vertical={false} strokeDasharray="3 3"/>
             <Tooltip/>
             <Legend />
             <Line type="monotone" dataKey="citations" stroke="#82ca9d" activeDot={{r: 8}}/>
            </LineChart>

            </Col>
          </Row>
          <Row className="py-5">
            <Col xs="12" md="6">
              <h3 className="mb-5">H-index vs Year</h3>

              <BarChart width={560} height={300} data={this.findHIndex()}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <XAxis tickLine={false} dataKey="year"/>
               <YAxis tickLine={false} axisLine={false} />
               <CartesianGrid vertical={false} strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               <Bar dataKey="index" fill="#1abc9c" />
              </BarChart>

            </Col>
            <Col xs="12" md="6">
              <h3 className="mb-5">Topics vs Year </h3>

              <BarChart width={560} height={300} data={this.props.topics}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}>
               <XAxis dataKey="year"/>
               <YAxis/>
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               <Bar dataKey="0" stackId="a" fill="#8884d8" />
               <Bar dataKey="1" stackId="a" fill="#82ca9d" />
               <Bar dataKey="2" stackId="a" fill="#1abc9c" />
               <Bar dataKey="3" stackId="a" fill="#2ecc71" />
               <Bar dataKey="4" stackId="a" fill="#3498db" />
               <Bar dataKey="5" stackId="a" fill="#9b59b6" />
               <Bar dataKey="6" stackId="a" fill="#34495e" />
               <Bar dataKey="7" stackId="a" fill="#16a085" />
               <Bar dataKey="8" stackId="a" fill="#27ae60" />
               <Bar dataKey="9" stackId="a" fill="#2980b9" />
               <Bar dataKey="10" stackId="a" fill="#8e44ad" />
               <Bar dataKey="11" stackId="a" fill="#2c3e50" />
               <Bar dataKey="12" stackId="a" fill="#f1c40f" />
               <Bar dataKey="13" stackId="a" fill="#e67e22" />
               <Bar dataKey="14" stackId="a" fill="#e74c3c" />
               <Bar dataKey="15" stackId="a" fill="#CF3A24" />
               <Bar dataKey="16" stackId="a" fill="#95a5a6" />
               <Bar dataKey="17" stackId="a" fill="#f39c12" />
               <Bar dataKey="18" stackId="a" fill="#d35400" />
               <Bar dataKey="19" stackId="a" fill="#c0392b" />
              </BarChart>

            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}
