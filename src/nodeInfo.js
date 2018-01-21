import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

import { Button, Header, Image, Modal, Container, Sidebar, Segment, Menu, Icon, Tab } from 'semantic-ui-react'


class NodeInfo extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {};
  };

  render() {
    return (
      <div>
      	<h3>{this.props.nodeInfo.body}</h3>
      </div>
    );
  }
}

export default NodeInfo;
