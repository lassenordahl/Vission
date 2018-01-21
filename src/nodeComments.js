import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

import { Button, Header, Image, Modal, Container, Sidebar, Segment, Menu, Icon, Tab, Form, TextArea } from 'semantic-ui-react'


class NodeMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messagesDict: this.props.commentInfo,
      messagesArray: []
    }

    this.getMessagesList = this.getMessagesList.bind(this);
    this.convertToArray = this.convertToArray.bind(this);

    this.state = {
      messagesArray: this.convertToArray()
    }
  };

  getMessagesList() {
    
  }

  convertToArray() {
    var returnArray = [];

    for (var message in this.props.commentInfo) {
      var temp = {};

      temp.name = this.props.commentInfo[message].name;
      temp.text = this.props.commentInfo[message].text;

      returnArray.push(temp);
    }
    return returnArray;
  }

  render() {

    var messageList = this.state.messagesArray.map(function(value) {
      return (
        <div key={value.text}>
          <h3>{value.name}</h3>
          <p>{value.text}</p>
        </div>
      );
     
    });

    return (
      <div>
      	{messageList}
        <Form>
          <TextArea placeholder='Join the vission!' />
          <Button color='purple'>Submit</Button>
          <Icon name='file image outline' size='big'></Icon>
        </Form>
      </div>
    );
  }
}

export default NodeMessages;
