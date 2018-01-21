import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

import { Button, Header, Image, Modal, Container, Sidebar, Segment, Menu, Icon, Tab } from 'semantic-ui-react';

import NodeInfo from './nodeInfo.js';
import NodeComments from './nodeComments.js';

import VissionApp from './firebase.js';


class NodeDialog extends Component {

  constructor(props) {
    super(props);


    // Connect to Firebase
    var ref = VissionApp.ref().child('node_info');

    this.state = {
      modalOpen: true,
      vissionTitle: "Music",
      panes : [
        { 
          menuItem: 'Info', render: () => 
          <Tab.Pane>
            <NodeInfo nodeInfo={this.state.nodeInfo}/>
          </Tab.Pane>
        },
        { 
          menuItem: 'Comments', render: () => 
          <Tab.Pane> 
            <NodeComments/>
          </Tab.Pane>
        },
      ]
    }

    ref.on("value", function(snapshot) {
      this.setState({node_info : snapshot.val()[props.uniqueID] || {body:"", messages: {}}})
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });


    this.handleClose = this.handleClose.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
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
    return (
      <div>
        <Modal open={this.state.modalOpen} onClose={this.handleClose} size='small' closeIcon>
        <Header content={this.state.vissionTitle} />
        <Tab panes={this.state.panes} />
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
      </div>
    );
  }
}

export default NodeDialog;
