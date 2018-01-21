import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

import { Button, Header, Image, Modal, Container, Sidebar, Segment, Menu, Icon, Tab } from 'semantic-ui-react'


class NodeInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	testComments: [
    		{
    			text: "test1",
    			name: "name1"
    		},
    		{
    			text: "test2",
    			name: "name2"
    		},
    		{
    			text: "test3",
    			name: "name3"
    		}
    	]
    }
    console.log(this.state.testComments);
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
