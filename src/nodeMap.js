import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Sigma, RelativeSize } from 'react-sigma';
import ReactDOM from 'react-dom';

import CommentTest from './commentTest.js';
import NodeDialog from './nodeDialog.js';

import { Button, Header, Image, Modal, Container } from 'semantic-ui-react'

class NodeMap extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      testNodeData: {
        "nodes": [
          {
            "id": "n0",
            "label": "A node",
            "x": 0,
            "y": 0,
            "size": 3
          },
          {
            "id": "n1",
            "label": "Another node",
            "x": 3,
            "y": 1,
            "size": 2
          },
          {
            "id": "n2",
            "label": "And a last one",
            "x": 1,
            "y": 3,
            "size": 1
          }
        ],
        "edges": [
          {
            "id": "e0",
            "source": "n0",
            "target": "n1"
          },
          {
            "id": "e1",
            "source": "n1",
            "target": "n2"
          },
          {
            "id": "e2",
            "source": "n2",
            "target": "n0"
          }
        ]
      },
      nodeID: null
    };

    this.onNodeDialogLoad = this.onNodeDialogLoad.bind(this);
    this.testIDLog = this.testIDLog.bind(this);
    this.closeNodeDialog = this.closeNodeDialog.bind(this);
  };

  testIDLog(ev) {
    this.setState({
      nodeID: ev.data.node.id
    });
    this.loadNodeDialog();
  };

  loadNodeDialog() {
    ReactDOM.render(<NodeDialog uniqueID={this.state.nodeID} closeDialog={this.closeNodeDialog}/>, document.getElementById('nodeDialog'));
  };

  closeNodeDialog() {
    ReactDOM.unmountComponentAtNode(document.getElementById('nodeDialog'));
  }

  onNodeDialogLoad() {
    console.log('loaded');
  };

  render() {
    return (
      <div>
        <div id="nodeDialog"></div>
        <Sigma onClickNode={this.testIDLog} style={{maxWidth:"-webkit-fill-available", height:"-webkit-fill-available", textAlign: "-webkit-auto"}} settings={{drawEdges:true}} graph={this.state.testNodeData}></Sigma>
      </div>
      );
  }
}

export default NodeMap;
