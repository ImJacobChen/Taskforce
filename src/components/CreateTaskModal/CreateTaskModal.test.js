import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { CreateTaskModal } from './CreateTaskModal';

describe('<CreateTaskModal />', () => {

    it('renders', () => {
        const wrapper = shallow(<CreateTaskModal />);
        expect(TestUtils.isCompositeComponent(wrapper)).toBeTruthy();
    });

    it('calls handleTaskTitleChange() on title input change', () => {
        let handleTaskTitleChangeMock = jest.fn();
        CreateTaskModal.prototype.handleTaskTitleChange = handleTaskTitleChangeMock;
        const wrapper = shallow(<CreateTaskModal />);
        wrapper.find('input[type="text"]').simulate('change', { target: { value: 'Test title'} });
        expect(handleTaskTitleChangeMock.mock.calls.length).toBe(1);
    });

    it('calls handleTaskDescriptionChange() on description input change',  () => {
        let handleTaskDescriptionChangeMock = jest.fn();
        CreateTaskModal.prototype.handleTaskDescriptionChange = handleTaskDescriptionChangeMock;
        const wrapper = shallow(<CreateTaskModal />);
        wrapper.find('textarea').simulate('change', { target: { value: 'Test description'} });
        expect(handleTaskDescriptionChangeMock.mock.calls.length).toBe(1);
    });

    it('calls handleTaskDueDateChange() on date input change', () => {
        let handleTaskDueDateChangeMock = jest.fn();
        CreateTaskModal.prototype.handleTaskDueDateChange = handleTaskDueDateChangeMock;
        const wrapper = shallow(<CreateTaskModal />);
        wrapper.find('input[type="date"]').simulate('change', { target: { value: '2017-06-01' } });
        expect(handleTaskDueDateChangeMock.mock.calls.length).toBe(1);
    });

    it('calls handleSubmit() on \'Submit\' click', () => {
        let handleSubmitMock = jest.fn();
        CreateTaskModal.prototype.handleSubmit = handleSubmitMock;
        const wrapper = shallow(<CreateTaskModal />);
        wrapper.find('.modal__submit-btn').simulate('click');
        expect(handleSubmitMock.mock.calls.length).toBe(1);
    });

    it('calls close() on \'Close\' button click', () => {
        let closeMock = jest.fn();
        CreateTaskModal.prototype.close = closeMock;
        const wrapper = shallow(<CreateTaskModal />);
        wrapper.find('.modal__close-btn').simulate('click');
        expect(closeMock.mock.calls.length).toBe(1);
    });

    it('calls close() on \'Close\' modal backdrop click', () => {
        let closeMock = jest.fn();
        CreateTaskModal.prototype.close = closeMock;
        const wrapper = shallow(<CreateTaskModal />);
        wrapper.find('.backdrop').simulate('click');
        expect(closeMock.mock.calls.length).toBe(1);
    });

});