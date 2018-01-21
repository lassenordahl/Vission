import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

import { Button, Header, Image, Modal, Container, Sidebar, Segment, Menu, Icon } from 'semantic-ui-react'


class NodeDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: true
    }

    console.log(props.closeDialog);


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
        <Header icon='browser' content='Cookies policy' />
        <Modal.Content>
          <h3>Unique ID: {this.props.uniqueID}</h3>
        </Modal.Content>
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
