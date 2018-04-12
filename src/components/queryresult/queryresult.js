import React, {Component} from 'react'
import {Container, Row} from 'reactstrap'
import JsonTable from 'ts-react-json-table'
import PaginationBox from '../../components/pagination/pagination';
import BarPlot from '../barplot';
import './queryresult.css';

export default class QueryResult extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageOfItems: [],
      executedSwitch: 0
    }
    this.onCLickCell = this.onCLickCell.bind(this)
    this.onChangePage = this.onChangePage.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({pageOfItems: [], executedSwitch: 0})
    }
    // if(this.state.search !== nextProps.search) {
    //   this.setState({executedSwitch: 0})
    // }
  }

  onChangePage(pageOfItems) {
      // update state with new page of items
      this.setState({ pageOfItems: pageOfItems });
  }

  onCLickCell(e, rowdata) {
    let url = `/aclakg/paper/${rowdata._id}`
    if (this.props.data.meta.collection === 1) {
      url = `/aclakg/author/${rowdata._id}`
    }
    else if (this.props.data.meta.collection === 3) {
      url = `/aclakg/conference/${rowdata._id}`
    }

    window.open(url,'_blank')
  }

  render() {
    let content;
    let display = <p>Loading</p>;

    if(this.props.status === 'initial') {
      content = (<Container>
                  <h2 className="my-0 py-3">Hey there enter a query first..</h2>
                  <p className="py-3">
                    Try one of these given below. <br /><br />
                    <i>List the papers published by Animesh Mukherjee</i><br />
                    <i>Enlist the papers of Chris Manning</i><br />
                    <i>Which conference accepts maximum number of papers?</i><br />
                    <i>Get the list of papers with positive sentiment score of an author A</i><br />
                    <i>Temporal plot of the previous query to see the acceptance trend in various conferences</i><br />
                    etc...
                  </p>
                </Container>);
    }

    else if(this.props.status === 'searched') {
      if (this.props.data.meta.type < 0) {
        display = <p>Hey there! If you want to search for an individual
          paper/author/title then select that category from the top of the
          search bar</p>
          if(!this.state.executedSwitch){
            if (this.props.data.meta.collection === 1) {
              this.props.singleEntity('author')
              this.setState({executedSwitch: 1})
            }
            else if (this.props.data.meta.collection === 3){
              this.props.singleEntity('conference')
              this.setState({executedSwitch: 1})
            }
          }
      }
      else if (this.props.data.meta.type === 0) {
        display = <BarPlot status={this.props.status} data={this.props.data} />;
      }
      else if (this.props.data.meta.type === 1) {
        if(this.props.data.docs.length > 0) {
          display = (<div>
                      <h3 style={{color: "#2ecc71"}}>Yes</h3>
                      <BarPlot status={this.props.status} data={this.props.data} />
                    </div>);
        }
        else display = <h3 style={{color: "#c0392b"}}>No</h3>;
      }
      else if (this.props.data.meta.type === 11) {
        if(this.props.data.docs.length > 0) {
          display = (<div>
                      <h3 style={{color: "#2ecc71"}}>Yes</h3>
                      <JsonTable onClickRow={this.onCLickCell} rows={this.state.pageOfItems} />
                      <Row className="querypagination">
                        <PaginationBox pageSize={11} items={this.props.data.docs} onChangePage={this.onChangePage} />
                      </Row>
                    </div>);
        }
        else display = <h3 style={{color: "#c0392b"}}>No</h3>;
      }
      else if (this.props.data.meta.type === 2) {
        display = (
          <div>
            <JsonTable onClickRow={this.onCLickCell} rows={this.state.pageOfItems} />
            <Row className="querypagination">
              <PaginationBox pageSize={11} items={this.props.data.docs} onChangePage={this.onChangePage} />
            </Row>
          </div>
        );
      }
      // else if (this.props.data.meta.type === 3) {
      //   //Something will happen here
      //   let docs = this.props.data.docs;
      //   let vari = this.props.data.meta.var; //year
      //   let sep_var = this.props.data.meta.sep_var; //conf
      //   let count = this.props.data.meta.count; //num_papers
      //   let objArray = [];
      //   docs.forEach(doc => {
      //     let obj = objArray.find(function (obj) { return obj[vari] === doc._id[vari]; });
      //     let currentVar = doc._id[sep_var];
      //     if(obj) {
      //       obj[currentVar] = doc[count];
      //     }
      //     else {
      //       objArray.push({[vari]: doc._id[vari], [currentVar]: doc[count]})
      //     }
      //   });
      //   let data = {docs: objArray, meta: this.props.data.meta}
      //   display = <BarPlot status={this.props.status} data={data} />;
      // }
      // else if (this.props.data.meta.type === 4) {
      //
      //   let data = this.props.data.docs[0].cit_trend;
      //   let newStruct = {docs: data, meta: this.props.data.meta};
      //   display = (<div>
      //     <h3>{this.props.data.docs[0].Name} -({this.props.data.docs[0].total_cit})</h3>
      //     <BarPlot status={this.props.status} data={newStruct} />
      //   </div>);
      // }
      // else if (this.props.data.meta.type === 5) {
      //   display = (<div>
      //     <h3>Started in {this.props.data.docs[0]._id}</h3>
      //     <BarPlot status={this.props.status} data={this.props.data} />
      //   </div>);
      // }
      // else if (this.props.data.meta.type === 12) {
      //   if(this.props.data.docs.length > 0) {
      //     display = (<div>
      //                 <h3>Yes</h3>
      //                 <JsonTable rows={this.props.data.docs} />
      //               </div>);
      //   }
      //   else display = <h3>No</h3>;
      // }
      // else if (this.props.data.meta.type === 11) {
      //   let data = this.props.data.docs.Yearwise_Publication;
      //
      //   // Transform data
      //
      //   let plotdata = [];
      //   let plotpoint;
      //   let yearcounter = 0;
      //   let key = "count";
      //   for (let year in data) {
      //     if (!yearcounter) {
      //       yearcounter = year // Base year
      //     }
      //     while (yearcounter != year) {
      //       plotpoint  = {year: yearcounter, [key]: 0}
      //       plotdata.push(plotpoint);
      //       yearcounter++;
      //     }
      //     plotpoint  = {year: year, [key]: data[year]}
      //     plotdata.push(plotpoint);
      //     yearcounter++;
      //   }
      //
      //   let newStruct = {docs: plotdata, meta: this.props.data.meta}
      //
      //   display = <BarPlot status={this.props.status} data={newStruct} />
      // }
      // else if (this.props.data.meta.type === 4) {
      //   display = <BarPlot status={this.props.status} data={this.props.data} />;
      // }
      else if (this.props.data.meta.type === 99) {
        display = (<div>
          <h3 className="mt-3">Sorry! We didn't get you.</h3>
          <p>Try another query like 'How many Machine learning papers are published in ACL?' <br /> or try 'List the papers published by Chris Manning'<br />Try adding full name of authors<br /> Try adding abbreviations of conferences</p>
        </div>)
      }

      content = (<div>
                  {display}
                </div>);
    }

    else {
      content = (<div>
                  <h5>Please wait while our minions get back to you!</h5>
                </div>);
    }
    return (
      <section className="queryresult mt-0 py-5">
        {content}
      </section>
    );
  }
}
