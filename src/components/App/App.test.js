import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {

  beforeAll(() => {

  });

  afterAll(() => {
  
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('calls openCreateTaskModal() on "Create task" click', () => {
    let openCreateTaskModalMock = jest.fn()
    App.prototype.openCreateTaskModal = openCreateTaskModalMock;

    const wrapper = shallow(<App />);
    wrapper.setState({ user: true, isCreateTaskModalOpen: false, });

    wrapper.find('.app__header__createTaskButton').simulate('click');
    expect(openCreateTaskModalMock.mock.calls.length).toBe(1);
  });

  it('calls signOut() on \'Sign out\' click', () => {
    let signOutMock = jest.fn();
    App.prototype.signOut = signOutMock;

    const wrapper = shallow(<App />);
    wrapper.setState({ user: true, isCreateTaskModalOpen: false });

    wrapper.find('.app__header__signOutButton').simulate('click');
    expect(signOutMock.mock.calls.length).toBe(1);
  });

});

