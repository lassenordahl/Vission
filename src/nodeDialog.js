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
    this.database = VissionApp.ref().child('node_info');

    this.state = {
      modalOpen: true,
      vissionTitle: "Music",
      node_info: {},
    };


    this.handleClose = this.handleClose.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  };

  componentDidMount() {

    this.database.on('value', snap => {
      console.log('event listener');
      ReactDOM.unmountComponentAtNode(document.getElementById('nodeMap'));
      this.setState({
        nodes: snap.val()
      });
      //this.helper(this.state.nodes);
    });

    this.database.on('value', snapshot => {
      console.log(snapshot.val()[this.props.uniqueID])
      this.setState({
        node_info : snapshot.val()[this.props.uniqueID]
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
            <NodeComments/>
          </Tab.Pane>
        },
      ];

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
