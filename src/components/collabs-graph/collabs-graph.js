import React, {Component} from 'react';
import {Sigma, RelativeSize, EdgeShapes, NodeShapes, NOverlap} from 'react-sigma';
import './collabs-graph.css';

class CollabGraph extends Component {
  constructor(props) {
    super(props);

    this.graph = {}
  }

  componentWillMount() {
    let nodes = [{id: this.props.id, label: this.props.author}];
    let edges = [];

    if( this.props.source === "conference") {
      this.props.collabs.forEach((conference,i) => {
        nodes.push({id: conference.conference_id, label: conference.name});
        edges.push({id: `e${i}`,source: this.props.id, target: conference.conference_id, label: conference.count})
        // edges.push({id: `e2${i}`,source: author.author_id, target: this.props.id, label: "8", color: "#e67e22"})
      });
    }
    else if ( this.props.source === "author_stats") {
      this.props.collabs.forEach((author,i) => {
        nodes.push({id: author.author_id, label: author.name});
        edges.push({id: `e${i}`,source: this.props.id, target: author.author_id, label: author.score})
        // edges.push({id: `e2${i}`,source: author.author_id, target: this.props.id, label: "8", color: "#e67e22"})
      });
    }
    this.graph.nodes = nodes.splice(0,15);
    this.graph.edges = edges.splice(0,15);
  }

  openAuthor(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  render() {
    return(
      <Sigma
        renderer="canvas"
        graph={this.graph}
        onClickNode={e => this.openAuthor(`/author/${e.data.node.id}`)}
        style={{maxWidth:"inherit", height:"500px"}}
        settings={{
          defaultNodeColor: '#3498DB',
          drawEdges: true,
          clone: true,
          defaultEdgeColor: '#2C3E50',
          labelThreshold: 0,
          font: "inherit",
          drawEdgeLabels: true,
          drawNodeLabels: true
        }}>
        <NodeShapes default="circle"/>
        <EdgeShapes default="tapered"/>
        <NOverlap gridSize={15} maxIterations={200}/>
        <RelativeSize initialSize={15}/>
      </Sigma>
    )
  }
}

export default CollabGraph;
