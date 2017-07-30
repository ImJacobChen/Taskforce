import React, { Component } from 'react';
import './App.css';

import {Provider} from 'react-redux';

import {applyMiddleware, createStore} from 'redux';

import reducers from '../../reducers/index';

import {getTasks, addTask, deleteTask} from '../../actions/taskActions';

import fire from '../../fire';

import SignUpLogIn from '../SignUpLogIn/SignUpLogIn';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';
import TaskList from '../TaskList/TaskList';

const store = createStore(reducers);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      user: null,
      isCreateTaskModalOpen: false,
    }
  }

  componentWillMount() {
    fire.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.setState({ user: user });
      } else {
        this.setState({ user: null });
      }
    }.bind(this));
  }

  openCreateTaskModal() {
    this.setState({ isCreateTaskModalOpen: true });
  }

  closeCreateTaskModal() {
    this.setState({ isCreateTaskModalOpen: false });
  }

  signOut() {
    fire.auth().signOut().then(function() {
      console.log('Signed out');
    }, function(error) {
      console.log(error);
    });
  }

  render() {
    // if (!this.state.user) {
    //   return (
    //     <SignUpLogIn />
    //   );
    // } else {
      return (
        <Provider store={store}>
          <div className="App">
            <div className="App-header">
              <h1>Taskforce</h1>

              <button 
                className="App-header-createTaskButton"
                onClick={this.openCreateTaskModal.bind(this)}>
                Create task
              </button>

              <button 
                className="App-header-signOutButton"
                onClick={this.signOut}>
                Sign out
              </button>
            </div>

            <CreateTaskModal 
              isOpen={this.state.isCreateTaskModalOpen} 
              onClose={this.closeCreateTaskModal.bind(this)} />
              
            <TaskList user={this.state.user} />
          </div>
        </Provider>
      );
    // }
  }
}

export default App;
