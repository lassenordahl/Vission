import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Sigma, RelativeSize } from 'react-sigma';
import ReactDOM from 'react-dom';
import NodeMap from './nodeMap.js'
import CommentTest from './commentTest.js';
import NodeDialog from './nodeDialog.js';
import { Button, Header, Image, Modal, Container, Sidebar, Segment, Menu } from 'semantic-ui-react'

// Backend imports
import firebase from 'firebase';
import {DB_CONFIG} from './Config.js';


class App extends Component {
  constructor(props) {
    super(props);
    
    // Connect to Firebase
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('nodes');

    // Default state
    this.state = {
      nodes: []
    };

    this.onNodeDialogLoad = this.onNodeDialogLoad.bind(this);
    this.loadNodeDialog = this.loadNodeDialog.bind(this);
    this.loadSigmaRender = this.loadSigmaRender.bind(this);
  };

  componentDidMount() {
    // Refresh state on value changes
    this.database.on('value', snap => {
      this.setState({
        nodes: snap.val()
      });
    console.log(this.state.nodes)
    });
  }

  onNodeDialogLoad() {
    console.log('loaded');
  };

  loadNodeDialog() {
    ReactDOM.render(<NodeDialog/>, document.getElementById('nodeDialog'));
  };

  loadSigmaRender() {
    ReactDOM.render(<NodeMap/>, document.getElementById('nodeMap'));
  };

  render() {
    return (
      <div className="App">
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={true} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              Account Information
            </Menu.Item>
            <Menu.Item name='gamepad'>
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
                <Button onClick={this.loadNodeDialog}>Load NodeDialog</Button>
                <Button onClick={this.loadSigmaRender}>Load Sigma</Button>

                <div id="nodeDialog"></div>
                <div id="nodeMap"></div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        
      </div>
    );
  }
}

export default App;
