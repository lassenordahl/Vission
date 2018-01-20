import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCCsYSqa_CyfjVNib761b9CrdNc7X0bUGM",
  authDomain: "vission-6d6fd.firebaseapp.com",
  databaseURL: "https://vission-6d6fd.firebaseio.com",
  projectId: "vission-6d6fd",
  storageBucket: "vission-6d6fd.appspot.com",
  messagingSenderId: "594035377988"
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
