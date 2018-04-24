import firebase from 'firebase';
require('firebase/firestore');

var config = {
  apiKey: "AIzaSyCa3QhBVG0OdZGcxsMHavC7cAAX69vzlw0",
  authDomain: "taskforce-c9057.firebaseapp.com",
  databaseURL: "https://taskforce-c9057.firebaseio.com",
  projectId: "taskforce-c9057",
  storageBucket: "taskforce-c9057.appspot.com",
  messagingSenderId: "981021149608"
};

export var fire = firebase.initializeApp(config);

export var firestore = firebase.firestore();