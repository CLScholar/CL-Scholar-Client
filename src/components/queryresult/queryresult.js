import React, {Component} from 'react'
import {Container} from 'reactstrap'
import JsonTable from 'ts-react-json-table'
import BarPlot from '../barplot';

export default class QueryResult extends Component {
  render() {
    let content;
    let display = <p>Loading</p>;

    if(this.props.status === 'initial') {
      content = (<Container>
                  <h2 className="my-0 py-3">Hey there enter a query first..</h2>
                  <p className="py-3">
                    Try one of these given below. <br />
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
      if (this.props.data.meta.type === 0) {
        display = <BarPlot status={this.props.status} data={this.props.data} />;
      }
      else if (this.props.data.meta.type === 1) {
        if(this.props.data.docs.length > 0) {
          display = (<div>
                      <h3>Yes</h3>
                      <BarPlot status={this.props.status} data={this.props.data} />
                    </div>);
        }
        else display = <h3>No</h3>;
      }
      else if (this.props.data.meta.type === 2) {
        display = <JsonTable rows={this.props.data.docs} />
      }
      else if (this.props.data.meta.type === 4) {

        let data = this.props.data.docs[0].cit_trend;
        let newStruct = {docs: data, meta: this.props.data.meta};
        display = (<div>
          <h3>{this.props.data.docs[0].Name} -({this.props.data.docs[0].total_cit})</h3>
          <BarPlot status={this.props.status} data={newStruct} />
        </div>);
      }
      else if (this.props.data.meta.type === 5) {
        display = (<div>
          <h3>Started in {this.props.data.docs[0]._id}</h3>
          <BarPlot status={this.props.status} data={this.props.data} />
        </div>);
      }
      else if (this.props.data.meta.type === 12) {
        if(this.props.data.docs.length > 0) {
          display = (<div>
                      <h3>Yes</h3>
                      <JsonTable rows={this.props.data.docs} />
                    </div>);
        }
        else display = <h3>No</h3>;
      }
      else if (this.props.data.meta.type === 11) {
        let data = this.props.data.docs.Yearwise_Publication;

        // Transform data

        let plotdata = [];
        let plotpoint;
        let yearcounter = 0;
        let key = "count";
        for (let year in data) {
          if (!yearcounter) {
            yearcounter = year // Base year
          }
          while (yearcounter != year) {
            plotpoint  = {year: yearcounter, [key]: 0}
            plotdata.push(plotpoint);
            yearcounter++;
          }
          plotpoint  = {year: year, [key]: data[year]}
          plotdata.push(plotpoint);
          yearcounter++;
        }
        console.log(plotdata);
        let newStruct = {docs: plotdata, meta: this.props.data.meta}

        console.log(newStruct);

        display = <BarPlot status={this.props.status} data={newStruct} />
      }
      // else if (this.props.data.meta.type === 4) {
      //   display = <BarPlot status={this.props.status} data={this.props.data} />;
      // }
      else if (this.props.data.meta.type === 99) {
        display = (<div>
          <h3>Something unexpected happened Sorry</h3>
          <p>Try adding full name of authors</p>
          <p>Try adding abbreviations of conferences</p>
        </div>)
      }

      content = (<div>
                  <h4>{this.props.search}</h4>
                  {display}
                </div>);
    }

    else {
      content = (<div>
                  <h3>{this.props.search}</h3>
                  <h5>Please wait content is loading</h5>
                </div>);
    }


    return (
      <section className="queryresult mt-0 py-5">
        {content}
      </section>
    );
  }
}
