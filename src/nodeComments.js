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

    var getInitial = function(name){
      return name.slice(0,1);
    }

    var messageList = this.state.messagesArray.map(function(value) {
      return (
        <div>
          <div className="initialIcon">
            <p className="initial">{getInitial(value.name).toUpperCase()}</p>
          </div>
          <div key={value.text}>
            <h3 className="commentName">{value.name}</h3>
            <p className="commentText">{value.text}</p>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className="largerMargin">
      	{messageList}
        </div>
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
