import React, { Component } from 'react';
import logo from './img/resize.png';
import './App.css';
import { Sigma, RelativeSize } from 'react-sigma';
import ReactDOM from 'react-dom';
import NodeMap from './nodeMap.js'
import CommentTest from './commentTest.js';
import NodeDialog from './nodeDialog.js';
import uuid from "uuid"
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
      visible: false,
      nodes: []
    };

    this.onNodeDialogLoad = this.onNodeDialogLoad.bind(this);
    this.loadNodeDialog = this.loadNodeDialog.bind(this);
    this.loadSigmaRender = this.loadSigmaRender.bind(this);
  };

  helper(nodes) {

    /* 
    INPUT DATA EXAMPLE
    {
    "nodes" : {
      "-K2ib4H77rj0LYewF7dP" : {
        "title" : "Brockhampton",
        "popularity" : "7",
        "parentid" : ""
      }
    }


    OUTPUT DATA EXAMPLE

    new_nodes = {
        "nodes": [
          {
            "id": "n0",
            "label": "A node",
            "x": 0,
            "y": 0,
            "size": 10000
          }
        ],
        "edges": [
          {
            "id": "e0",
            "source": "n0",
            "target": "n1"
          }
        ]
      }
    */

    var new_nodes = {
      "nodes" : [],
      "edges" : []
    };

    for (var node in nodes) {
      var new_node = {};

      new_node.id = node;
      new_node.label = nodes[node].title;
      new_node.size = nodes[node].popularity;
      new_node.x = 0;
      new_node.y = 0;

      new_nodes.nodes.push(new_node);
    }

    for (var node in nodes) {
      if (nodes[node].parentid) {
        for (var other_node in nodes) {
          if (other_node === nodes[node].parentid) {
            new_nodes.edges.push(
              {
                "id" : uuid.v4(),
                "source" : node,
                "target" : other_node
              })
          }
        }
      }
    }

    return new_nodes;
  };

  componentDidMount() {
    // Refresh state on value changes
    this.database.on('value', snap => {
      this.setState({
        nodes: snap.val()
      });
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

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const {visible} = this.state
    return (
      <div className="App">
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={true} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <a href={this.toggleVisibility}> <img src={logo}/> </a>
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <a href='#'>Log In</a>
            </Menu.Item>
            <Menu.Item name='camera'>
              <a href='#'>Create Account</a>
            </Menu.Item>
            <Menu.Item name='camera'>
              <a href='#'>About</a>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>VISSION</Header>
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
