import React, { Component } from 'react';
import logo from './img/resize.png';
import './App.css';
import { Sigma, RelativeSize } from 'react-sigma';
import ReactDOM from 'react-dom';
import NodeMap from './nodeMap.js'
import CommentTest from './commentTest.js';
import NodeDialog from './nodeDialog.js';
import uuid from "uuid";
import { Button, Header, Image, Modal, Container, Sidebar, Segment, Menu } from 'semantic-ui-react';

// Backend imports
import VissionApp from './firebase.js';

class App extends Component {
  constructor(props) {
    super(props);
    
    // Connect to Firebase
    this.database = VissionApp.ref().child('nodes');

    // Default state
    this.state = {
      nodes: {},
      newNodes: {},
      sidebarVisible: true
    };

    this.onNodeDialogLoad = this.onNodeDialogLoad.bind(this);
    this.loadSigmaRender = this.loadSigmaRender.bind(this);
    this.helper = this.helper.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
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

    console.log(nodes);

    var new_nodes = {
      "nodes" : [],
      "edges" : []
    };
    

    for (var node in nodes) {
      var new_node = {};

      new_node.id = node;
      new_node.label = nodes[node].title;
      new_node.size = nodes[node].popularity * 3;
      new_node.x = Math.random() * .1;
      new_node.y = Math.random() * .1;

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
    this.setState({
      newNodes: new_nodes
    });
    this.loadSigmaRender();
  };

  componentDidMount() {
    // Refresh state on value changes
    this.database.on('value', snap => {
      this.setState({
        nodes: snap.val()
      });
      this.helper(this.state.nodes);
    });
  }

  onNodeDialogLoad() {
    console.log('loaded');
  };

  loadSigmaRender() {
    ReactDOM.render(<NodeMap nodes={this.state.newNodes}/>, document.getElementById('nodeMap'));
  };

  toggleVisibility() {
    this.setState({ 
      sidebarVisible: !this.state.sidebarVisible 
    });
  };

  render() {
    return (
      <div className="App">
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={this.state.sidebarVisible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <a href='#'> <img src={logo}/> </a>
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
            <div style={{ position: 'absolute', zIndex: '99', top: '10px', left: '10px', color: 'white'}}><i class="sidebar icon" onClick={this.toggleVisibility}></i></div>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <div id="nodeMap"></div>
              <div style={{ position: 'absolute', zIndex: '99', top: '10px', left: '10px', color: 'black'}}><i class="sidebar icon" onClick={this.toggleVisibility}></i></div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;
