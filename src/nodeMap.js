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

    console.log(props.nodes);

    this.state = {
      nodeData: props.nodes,
      nodeID: null,
      login: props.login
    };

    console.log(this.state.login);


    this.onNodeDialogLoad = this.onNodeDialogLoad.bind(this);
    this.testIDLog = this.testIDLog.bind(this);
    this.closeNodeDialog = this.closeNodeDialog.bind(this);
    this.testLog = this.testLog.bind(this);
  };

  testIDLog(ev) {
    console.log(ev.data.node);
    this.setState({
      nodeID: ev.data.node.id,
      title: ev.data.node.label
    });
    this.loadNodeDialog();
  };

  testLog() {
    console.log(this.props);
  };

  loadNodeDialog() {
    ReactDOM.render(<NodeDialog label={this.state.title} uniqueID={this.state.nodeID} closeDialog={this.closeNodeDialog}/>, document.getElementById('nodeDialog'));
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
        <Sigma onClickNode={this.testIDLog} style={{maxWidth:"-webkit-fill-available", height:"-webkit-fill-available", textAlign: "-webkit-auto"}} settings={{drawEdges:true}} graph={this.state.nodeData}></Sigma>
      </div>
      );
  }
}

export default NodeMap;
