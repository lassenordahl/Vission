import React, { Component } from 'react';
import logo from './img/resize.png';
import './App.css';
import { Sigma, RelativeSize } from 'react-sigma';
import ReactDOM from 'react-dom';
import NodeMap from './nodeMap.js'
import CommentTest from './commentTest.js';
import NodeDialog from './nodeDialog.js';
import LoginModal from './loginModal.js';
import uuid from "uuid";
import Login from './Login';
import { GoogleLogin } from 'react-google-login-component';
import { Button, Header, Icon, Image, Modal, Container, Sidebar, Segment, Menu } from 'semantic-ui-react';

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
      sidebarVisible: true,
      aboutVisibile: false
    };

    this.onNodeDialogLoad = this.onNodeDialogLoad.bind(this);
    this.loadSigmaRender = this.loadSigmaRender.bind(this);
    this.helper = this.helper.bind(this);
    this.toggleSidebarVisibility = this.toggleSidebarVisibility.bind(this);
    this.toggleAboutVisibility = this.toggleAboutVisibility.bind(this);
    
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
      new_node.size = nodes[node].popularity;
      new_node.x = Math.random() * .15;
      new_node.y = Math.random() * .15;
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

  handleGoogleInfo() {
    console.log(this.responseHandler);
  }

  onNodeDialogLoad() {
    console.log('loaded');
  };

  loadSigmaRender() {
    ReactDOM.render(<NodeMap nodes={this.state.newNodes}/>, document.getElementById('nodeMap'));
  };

  loadLoginModal() {
    ReactDOM.render(<LoginModal />, document.getElementById('loginModal'));
  }

  toggleAboutVisibility() {
    this.setState({
      aboutVisibile : !this.state.aboutVisibile
    });
  };

  toggleSidebarVisibility() {
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
            <Modal trigger={<Button>Log In</Button>} size='small'>
            <Header icon='comments' content='Choose a username.' />
            <Modal.Content>
              <p>Choose a username to use when chatting in the Vission.</p>
              <div class='ui input'><input type="text" placeholder="Type here..." /></div>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' inverted>
                <Icon name='checkmark' /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
            </Menu.Item>
            <Menu.Item name='about'>
              <a href='#' onClick={this.toggleAboutVisibility}>About</a>
            </Menu.Item>
            <div className='about'>
              <Container className='marginAbout'>
                {this.state.aboutVisibile ? <p className='marginAbout' style={{textAlign:'left', color:'white', padding:'5px', paddingRight: '5px'}}>
                  Vission.io is a new type of social network. A network where people connect themselves and create innovative ideas together. The network expands over time as more people join and branch out into their own topics of creativity. Our platform was designed for anyone who has the creative drive in them, artists, musicians, writers, whoever! As long as you can see the Vission, you can build something to change the world.
                </p> : null }
              </Container>
              </div>
            <div style={{ position: 'absolute', zIndex: '99', top: '10px', left: '10px', color: 'white'}}><i className="sidebar icon" onClick={this.toggleSidebarVisibility}></i></div>
          </Sidebar>
          <div class='ui modal' id='loginModal'></div>
          <Sidebar.Pusher>
            <Segment basic>
              <div id="nodeMap"></div>
              <div style={{ position: 'absolute', zIndex: '99', top: '10px', left: '10px', color: 'black'}}><i className="sidebar icon" onClick={this.toggleSidebarVisibility}></i></div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;
