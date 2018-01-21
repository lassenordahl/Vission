import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

import { Button, Header, Image, Modal, Container, Sidebar, Segment, Menu, Icon, Tab } from 'semantic-ui-react';

import NodeInfo from './nodeInfo.js';
import NodeComments from './nodeComments.js';


class NodeDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: true,
      vissionTitle: "Music",
      panes : [
        { 
          menuItem: 'Info', render: () => 
          <Tab.Pane>
            <NodeInfo uniqueID={this.props.uniqueID}/>
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
        <Modal open={this.state.modalOpen} onClose={this.handleClose} size='small'>
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
