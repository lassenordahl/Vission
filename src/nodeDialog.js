import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

import { Button, Header, Image, Modal, Container, Sidebar, Segment, Menu, Icon, Tab } from 'semantic-ui-react';

import NodeInfo from './nodeInfo.js';
import NodeMessages from './nodeComments.js';

import VissionApp from './firebase.js';


class NodeDialog extends Component {

  constructor(props) {
    super(props);

    // Connect to Firebase
    this.database = VissionApp.ref().child('node_info');

    this.state = {
      modalOpen: true,
      vissionTitle: "Music",
      nodeInfo: {},
    };

    this.handleClose = this.handleClose.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  };

  componentDidMount() {

    this.database.on('value', snapshot => {
      this.setState({
        nodeInfo : snapshot.val()[this.props.uniqueID] || {body: "", messages: {}}
      });
    });

  };

  handleClose() {
    this.setState({
      modalOpen: false
    });
    this.closeDialog();
  };

  closeDialog = () => {
    this.props.closeDialog();
  };

  render() {
    var panes = [
        { 
          menuItem: 'Info', render: () => 
          <Tab.Pane>
            <NodeInfo nodeInfo={this.state.nodeInfo}/>
          </Tab.Pane>
        },
        { 
          menuItem: 'Comments', render: () => 
          <Tab.Pane> 
            <NodeMessages commentInfo={this.state.nodeInfo.messages}/>
          </Tab.Pane>
        },
      ];

    return (
      <div>
        <Modal open={this.state.modalOpen} onClose={this.handleClose} size='small' closeIcon>
        <Header content={this.state.vissionTitle} />
        <Tab panes={panes} />
        <Modal.Actions>
          <Button color='red' onClick={this.handleClose} inverted>
            <Icon name='wrench' /> Build
          </Button>
        </Modal.Actions>
      </Modal>
      </div>
    );
  }
}

export default NodeDialog;
