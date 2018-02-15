import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import {ACL_API} from '../../config';
import PaperRows from '../paper-rows/paper-rows';
import PaginationBox from '../../components/pagination/pagination';
import axios from 'axios';
// import './paginated-paper.css';

class PaginatedPaper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageOfItems: [],
      data: [],
      loading: true
    };

    this.display = <p>Loading...</p>;

    this.onChangePage = this.onChangePage.bind(this);
    this.getPaperData = this.getPaperData.bind(this);
  }

  getPaperData(displayItems) {
    if(displayItems.length === 0 ) {
      return this.setState({display: <p>That's all folks.</p>})
    }
    // Initiate Loading sequence until data is fetched
    this.display = <p>Loading...</p>;
    let callItems = displayItems.join(',');
    let url = ACL_API + 'papermeta/';
    // console.log(url+callItems);
    axios.get(url + callItems)
    .then(response => {
      this.setState({data: response.data, loading: false});
    })
    .catch(error => {
      console.log(error);
    });
    // if(this.state.loading) {
    //   console.log("data", this.state.data);
    //   let paperRows = this.state.data.map((paper,i) => {
    //     return (
    //       <PaperRows
    //         key = {i + paper.paper_id}
    //         id = {paper.paper_id}
    //         title = {paper.title}
    //         citations = {paper.citations}
    //       />
    //     );
    //   });
    //   this.display = paperRows;
    // }
    // let a = displayItems.map(every => {
    //   return <p>{every}</p>
    // });
    // this.setState({display: a});
  }

  onChangePage(pageOfItems) {
      // update state with new page of items
      this.setState({ pageOfItems: pageOfItems }, () => {
        this.getPaperData(this.state.pageOfItems);
      });
  }

  render() {
    if (this.props.paperList.length === 0) {
      return <p>No papers found</p>;
    }
    if(!this.state.loading) {
      let paperRows = this.state.data.map((paper,i) => {
        return (
          <PaperRows
            key = {i + paper.paper_id}
            id = {paper.paper_id}
            title = {paper.title}
            citations = {paper.citations}
          />
        );
      });
      this.display = paperRows;
    }
    return (
      <div>
        <Row>
            <Col className="paper" xs="12" md="10">
              <h6><b>Title</b></h6>
            </Col>
            <Col className="citations" xs="12" md="2">
              <h6><b>Citations</b></h6>
            </Col>
            <hr className="my-2" />
        </Row>
        <div>{this.display}</div>
        <PaginationBox items={this.props.paperList} onChangePage={this.onChangePage} />
      </div>
    );
  }
}

export default PaginatedPaper;
