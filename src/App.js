import React, { Component } from 'react';
import './App.css';

import CreateTaskModal from './components/CreateTaskModal/CreateTaskModal';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      tasks: [],
      isCreateTaskModalOpen: false 
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Taskforce</h1>

          <button 
            className="App-header-createTaskButton"
            onClick={this.openCreateTaskModal.bind(this)}>
            Create task
          </button>
        </div>

        <CreateTaskModal 
          isOpen={this.state.isCreateTaskModalOpen} 
          onClose={this.closeCreateTaskModal.bind(this)}
          addTask={this.addTask.bind(this)}/>
          
        <ul className="tasks">
        {this.state.tasks.map(function(task, index) {
          return <li key={index} className="task">{task}</li>
        })}
        </ul>
      </div>
    );
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
}

export default App;
