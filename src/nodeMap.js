import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Sigma, RelativeSize } from 'react-sigma';
import ReactDOM from 'react-dom';

import CommentTest from './commentTest.js';

import { Button, Header, Image, Modal, Container } from 'semantic-ui-react'

class App extends Component {
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
      }
    };

    this.onNodeDialogLoad = this.onNodeDialogLoad.bind(this);
    this.loadSigmaRender = this.loadSigmaRender.bind(this);
  };

  onNodeDialogLoad() {
    console.log('loaded');
  };

  render() {
    return (
      <Sigma renderer="webgl" style={{maxWidth:"inherit", height:"400px"}} settings={{drawEdges:true}} onOverNode={e => console.log("Mouse over node: " + e.data.node.label)} graph={this.state.testNodeData}>
        <RelativeSize initialSize={2} />
      </Sigma>
    );
  }
}

export default App;
