import React, { Component } from 'react';
import './App.css';

import fire from './fire';

import SignUpLogIn from './components/SignUpLogIn/SignUpLogIn';
import CreateTaskModal from './components/CreateTaskModal/CreateTaskModal';
import Task from './components/Task/Task';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      user: null,
      tasks: [],
      isCreateTaskModalOpen: false,
      signUpEmail: '',
      signUpPassword: '', 
    }

    this._onSignUpEmailChange = this._onSignUpEmailChange.bind(this);
    this._onSignUpPasswordChange = this._onSignUpPasswordChange.bind(this);
    this._onSignUpFormSubmit = this._onSignUpFormSubmit.bind(this);
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

  addTask(task) {
    var tasks = this.state.tasks;

    var newTasks = tasks.slice(0);
    newTasks.push(task);

    this.setState({ tasks: newTasks });
  }

  deleteTask(taskIndex) {
    var tasks = this.state.tasks;

    var newTasks = tasks.slice(0);
    newTasks.splice(taskIndex, 1);

    this.setState({ tasks: newTasks });
  }

  _onSignUpEmailChange(event) {
    this.setState({signUpEmail: event.target.value});
  }

  _onSignUpPasswordChange(event) {
    this.setState({signUpPassword: event.target.value});
  }

  _onSignUpFormSubmit(event) {
    console.log(this.state.signUpEmail, this.state.signUpPassword);
    fire.auth().createUserWithEmailAndPassword(this.state.signUpEmail, this.state.signUpPassword).catch(function(error) {
      console.log(error);
    });
    event.preventDefault();
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
            onClose={this.closeCreateTaskModal.bind(this)}
            addTask={this.addTask.bind(this)}/>
            
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
