import React, { Component } from 'react';
import logo from './img/resize.png';
import './App.css';
import { Sigma, RelativeSize } from 'react-sigma';
import ReactDOM from 'react-dom';
import NodeMap from './nodeMap.js'
import CommentTest from './commentTest.js';
import NodeDialog from './nodeDialog.js';
import uuid from "uuid";
import Login from './Login';
import { GoogleLogin } from 'react-google-login-component';
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

  colorLuminance(hex, lum) {
     // validate hex string
     hex = String(hex).replace(/[^0-9a-f]/gi, '');
     if (hex.length < 6) {
       hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
     }
     lum = lum || 0;
 
     // convert to decimal and change luminosity
     var rgb = "#", c, i;
     for (i = 0; i < 3; i++) {
       c = parseInt(hex.substr(i*2,2), 16);
       c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
       rgb += ("00"+c).substr(c.length);
     }

     return rgb;
   }

  
  

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
      new_node.color = this.colorLuminance("BF3EFF", Math.random() - 0.5)

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
      console.log('event listener');
      ReactDOM.unmountComponentAtNode(document.getElementById('nodeMap'));
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
          <Sidebar as={Menu} animation='overlay' style={{width: '250px'}} visible={this.state.sidebarVisible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <a href='#'><img src={logo}/></a>
            </Menu.Item>
            <Menu.Item name='logIn'>
              <Login/>
            </Menu.Item>
            <Menu.Item name='createAccount'>
              <a href='#'>Create Account</a>
            </Menu.Item>
            <Menu.Item name='about'>
              <a href='#'>About</a>
            </Menu.Item>
            <div style={{ position: 'absolute', zIndex: '99', top: '10px', left: '10px', color: 'white'}}><i className="sidebar icon" onClick={this.toggleVisibility}></i></div>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <div id="nodeMap"></div>
              <div style={{ position: 'absolute', zIndex: '99', top: '10px', left: '10px', color: 'black'}}><i className="sidebar icon" onClick={this.toggleVisibility}></i></div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;
