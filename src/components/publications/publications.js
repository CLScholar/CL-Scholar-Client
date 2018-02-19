import React, {Component} from 'react';
import { Container } from 'reactstrap';
import PaperRows from '../paper-rows/paper-rows';
import PaginationBox from '../../components/pagination/pagination';
import './publications.css';


class Publications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: 1,
      pageOfItems: []
    }
    this.sortbyYear = this.sortbyYear.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  sortbyYear() {
    if(this.state.category === 1) {
      return this.props.papers
    }
    let papers = this.props.papers.slice();;
    let length = papers.length;
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < (length - i - 1); j++) {
        if(papers[j].paper_year > papers[j+1].paper_year) {
          var tmp = papers[j];
          papers[j] = papers[j+1];
          papers[j+1] = tmp;
        }
      }
    }
    return papers;
  }

  onChangePage(pageOfItems) {
      // update state with new page of items
      this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    let papers_list = this.sortbyYear();
    // console.log(papers_list);
    // let paperslist = papers_list.map((paper) => {
    // return (
    //     <PaperRows
    //       key = {paper.paper_id}
    //       id = {paper.paper_id}
    //       title = {paper.paper_title}
    //       citations = {paper.citations}
    //     />
    //   );
    // });

    return (
      <section className="publications py-5">
        <Container>
          <h1 className="py-3 mb-4">Publications</h1>
          <div className="pb-5 sort">Sort by :
            <span
              className={this.state.category === 1 ? "active" : null}
              onClick={() => this.setState({category: 1, pageOfItems: []})}>
              Citations
              </span>
            {/* <span
              className={this.state.category === 2 ? "active" : null}
              onClick={() => this.setState({category: 2, pageOfItems: []})}>
              Year
            </span> */}
          </div>
          {this.state.pageOfItems.map(paper =>
            <PaperRows
              key = {paper.paper_id}
              id = {paper.paper_id}
              title = {paper.paper_title}
              citations = {paper.citations}
            />
          )}
          <PaginationBox pageSize={10} items={papers_list} onChangePage={this.onChangePage} />
        </Container>
      </section>
    );
  }

}

export default Publications;
