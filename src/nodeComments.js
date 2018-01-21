import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

import { Button, Header, Image, Modal, Container, Sidebar, Segment, Menu, Icon, Tab, Form, TextArea } from 'semantic-ui-react'


class NodeComments extends Component {
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

  };

  render() {

    var commentList = this.state.testComments.map(function(comment) {
      return (
        <div>
          <h3>{comment.name}</h3>
          <p>{comment.text}</p>
        </div>
      );
    });

    return (
      <div>
      	{commentList}
        <Form>
          <TextArea placeholder='Join the vission!' />
          <Button color='purple'>Submit</Button>
          <Icon name='file image outline' size='big'></Icon>
        </Form>
      </div>
    );
  }
}

export default NodeComments;
