import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import VissionApp from './firebase.js';
import { Button, Header, Input, Image, Modal, Container, Sidebar, Segment, Menu, Icon, Tab, Form, TextArea, Grid } from 'semantic-ui-react'


class NodeMessages extends Component {
  constructor(props) {
    super(props);

    // Connect to Firebase
    this.database = VissionApp.ref().child('node_info');

    this.state = {
      messagesDict: this.props.commentInfo,
      messagesArray: [],
      message: ""
    }

    this.getMessagesList = this.getMessagesList.bind(this);
    this.convertToArray = this.convertToArray.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      messagesArray: this.convertToArray()
    }
  };

  getMessagesList() {
    
  }

  saveMessage() {
    //Check that the user entered a message and is signed in.
    if (this.messageInput.value/*&& this.checkSignedInWithMessage()*/) {
      //var currentUser = this.auth.currentUser;
      // Add a new message entry to the Firebase Database.
      this.database.messages.push({
        //name: currentUser.displayName,
        name: "test",
        text: this.messageInput.value
        //photoUrl: currentUser.photoURL || '/images/profile_placeholder.png'
      }).then(function() {
        // Clear message text field and SEND button state.
        //FriendlyChat.resetMaterialTextfield(this.messageInput);
        //this.toggleButton();
      }.bind(this)).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
      });
    }
  }

  submit() {
    console.log(this.state.message);
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

  handleChange(evt) {  
    this.setState({
      message: evt.target.value
    });
  };

  render() {

    var getInitial = function(name){
      return name.slice(0,1);
    }

    var messageList = this.state.messagesArray.map(function(value) {
      return (

        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <div className="initialIcon">
                <div className="space"></div>
                <p className="initial">{getInitial(value.name).toUpperCase()}</p>
              </div>
            </Grid.Column>
            <Grid.Column width={14}>
              <div key={value.text}>
                <h3 className="commentName">{value.name}</h3>
                <p className="commentText">{value.text}</p>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    });

    return (
      <div>
        <div className="largerMargin">
      	{messageList}
        </div>
        <div className="largerMargin">
          <Form>
            <Grid>
              <Grid.Row>
                <Grid.Column width={13}>
                  <Input fluid type="text" value={this.state.message} onChange={this.handleChange} placeholder='Join the Vission' />
                </Grid.Column>
                <Grid.Column width={3}>
                  <Button onClick={this.submit} color='purple'>Submit</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </div>
      </div>
    );
  }
}

export default NodeMessages;
