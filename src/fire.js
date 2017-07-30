import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCa3QhBVG0OdZGcxsMHavC7cAAX69vzlw0",
  authDomain: "taskforce-c9057.firebaseapp.com",
  databaseURL: "https://taskforce-c9057.firebaseio.com",
  storageBucket: "taskforce-c9057.appspot.com",
  messagingSenderId: "123123123123"
};

var fire = firebase.initializeApp(config);

export var user = fire.auth().onAuthStateChanged(function(user) {
  if (user) return user;
});

export default fire;