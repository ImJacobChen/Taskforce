import * as actions from './taskActions';
import * as taskConstants from '../constants/taskConstants';

describe('taskActions', () => {

    describe('addTask()', () => {

        test('It should return an ADD_TASK action and our payload', () => {
            const task = {
                key: 1,
                title: 'title',
                description: 'description'
            };
            const expected = {
                type: taskConstants.ADD_TASK,
                payload: task
            };
            expect(actions.addTask(task)).toEqual(expected);
        })

    });

    describe('receiveTask()', () => {

        test('It should return a RECEIVE_TASK action and our payload', () => {
            const task = {
                key: 1,
                title: 'title',
                description: 'description'
            };
            const expected = {
                type: taskConstants.RECEIVE_TASK,
                payload: task
            };
            expect(actions.receiveTask(task)).toEqual(expected);
        });

    });

    describe('updateTask()', () => {

        test('It should return a UPDATE_TASK action and our payload', () => {
            const task = {
                key: 1,
                title: 'title',
                description: 'description'
            };
            const expected = {
                type: taskConstants.UPDATE_TASK,
                payload: task
            };
            expect(actions.updateTask(task)).toEqual(expected);
        });

    });

    describe('replaceTasks()', () => {

        test('It should return a REPLACE_TASKS action and our payload', () => {
            const tasks = [
                {
                    key: 1,
                    title: 'title',
                    description: 'description'
                },
                {
                    key: 2,
                    title: 'title2',
                    description: 'description2'
                }
            ];
            const expected = {
                type: taskConstants.REPLACE_TASKS,
                payload: tasks
            };
            expect(actions.replaceTasks(tasks)).toEqual(expected);
        });

    });

    describe('deleteTask()', () => {

        test('It should return a DELETE_TASK action and our payload', () => {
            const task = {
                key: 1,
                title: 'title',
                description: 'description'
            };
            const expected = {
                type: taskConstants.DELETE_TASK,
                payload: task
            };
            expect(actions.deleteTask(task)).toEqual(expected);
        });

    });

    describe('subscribeToTasks()', () => {

        test('It should return a SUBSCRIBE_TO_TASKS action', () => {
            const expected = {
                type: taskConstants.SUBSCRIBE_TO_TASKS,
            };
            expect(actions.subscribeToTasks()).toEqual(expected);
        });

    });

    describe('unsubscribeToTasks()', () => {

        test('It should return a UNSUBSCRIBE_TO_TASKS action', () => {
            const expected = {
                type: taskConstants.UNSUBSCRIBE_TO_TASKS,
            };
            expect(actions.unsubscribeToTasks()).toEqual(expected);
        });

    });

    describe('loadingTasks()', () => {

        test('It should return a LOADING_TASKS action', () => {
            const expected = {
                type: taskConstants.LOADING_TASKS,
            };
            expect(actions.loadingTasks()).toEqual(expected);
        });

    });

    describe('loadingTasksSuccess()', () => {

        test('It should return a LOADING_TASKS_SUCCESS action', () => {
            const expected = {
                type: taskConstants.LOADING_TASKS_SUCCESS,
            };
            expect(actions.loadingTasksSuccess()).toEqual(expected);
        });

    });

    describe('loadingTasksFailed()', () => {

        test('It should return a LOADING_TASKS_FAILED action and our payload', () => {
            const error = 'error';
            const expected = {
                type: taskConstants.LOADING_TASKS_FAILED,
                payload: error
            };
            expect(actions.loadingTasksFailed(error)).toEqual(expected);
        });

    });

});
