import React, { Component } from 'react';
import './App.css';

import fire from '../../fire';

import SignUpLogIn from '../SignUpLogIn/SignUpLogIn';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';
import Task from '../Task/Task';

const database = fire.database();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      user: null,
      tasks: [],
      isCreateTaskModalOpen: false,
    }
  }

  componentWillMount() {
    fire.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.setState({ user: user });
        var tasksRef = database.ref(user.uid + '/tasks');
        tasksRef.on('child_added', function(data) {
          console.log('Child added', data.val());
        });

        tasksRef.on('child_changed', function(data) {
          console.log('Child changed', data.val());
        });

        tasksRef.on('child_removed', function(data) {
          console.log('Child removed', data.val());
        });
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

  deleteTask(taskIndex) {
    var tasks = this.state.tasks;

    var newTasks = tasks.slice(0);
    newTasks.splice(taskIndex, 1);

    this.setState({ tasks: newTasks });
  }

  signOut() {
    fire.auth().signOut().then(function() {
      console.log('Signed out');
    }, function(error) {
      console.log(error);
    });
  }

  render() {
    if (!this.state.user) {
      return (
        <SignUpLogIn />
      );
    } else {
      return (
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
            
          <ul className="tasks">
          {this.state.tasks.map((task, index) => {
            return <Task task={task} index={index} deleteTask={this.deleteTask.bind(this)} />
          })}
          </ul>
        </div>
      );
    }
  }
}

export default App;
