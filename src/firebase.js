import firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyCCsYSqa_CyfjVNib761b9CrdNc7X0bUGM",
  authDomain: "vission-6d6fd.firebaseapp.com",
  databaseURL: "https://vission-6d6fd.firebaseio.com",
  projectId: "vission-6d6fd",
  storageBucket: "vission-6d6fd.appspot.com",
  messagingSenderId: "594035377988"
};

var VissionApp = firebase.initializeApp(firebaseConfig);
export default VissionApp.database(); //this doesnt have to be database only