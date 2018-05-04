import React, { Component } from 'react';
import './App.css';

import {Provider} from 'react-redux';

import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducers from '../../redux/reducers/index';
import rootSaga from '../../redux/sagas';

import {fire} from '../../fire';

import SignUpLogIn from '../SignUpLogIn/SignUpLogIn';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';
import TaskList from '../TaskList/TaskList';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware, logger);
const store = createStore(reducers, middleware);
sagaMiddleware.run(rootSaga);

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
    fire.auth().signOut().then(() => {
      console.log('Signed out');
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    if (!this.state.user) {
      return <SignUpLogIn />;
    } else {
      return (
        <Provider store={store}>
          <div className="app">
            <div className="app__header">
              <h1>Taskforce</h1>

              <button 
                className="btn app__header__createTaskButton"
                onClick={this.openCreateTaskModal.bind(this)}>
                Create task
              </button>

              <button 
                className="btn app__header__signOutButton"
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
    }
  }
}

export default App;
