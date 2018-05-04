import {
    createFirebaseEventChannel,
    subscribeToTasks,
    subscribeToTasksWatcher
} from './subscribeToTasksSaga';

import {
    take,
    call,
    put
} from 'redux-saga/effects';

import {
    eventChannel,
    runSaga
} from 'redux-saga';

import {
    SUBSCRIBE_TO_TASKS,
    REPLACE_TASKS
} from '../../constants/taskConstants';

import { fire } from '../../../fire';

jest.mock('../../../fire');

describe('subscribeToTasksSaga', () => {
    
    describe('subscribeToTasksWatcher()', () => {

        test('It will wait for a \'SUBSCRIBE_TO_TASKS\' dispatch,  then call subscribeToTasks()', () => {

            const gen = subscribeToTasksWatcher();
            expect(gen.next().value).toMatchObject(take(SUBSCRIBE_TO_TASKS));
            expect(gen.next().value).toMatchObject(call(subscribeToTasks));
            expect(gen.next().done).toBeTruthy();

        });

    });

    describe('subscribeToTasks()', () => {

        test('It recieves actions from the event channel and dispatches those actions.', () => {

            const dispatched = [];
            const saga = runSaga({
                dispatch: (action) => dispatched.push(action),
                getState: () => ({ tasks: { tasks: [], tasksState: 'idle' } }),
            }, subscribeToTasks);
            
            // Mock firebase 'value' emit
            fire.emitData('value', { 
                val: () => { 
                    return {
                        '-LB_HIvA0iwEXaw-Rbit': { description: "New task1", dueDate: 1525561200000, priority: 1, title: "New task1" },
                        '-LB_HmNEyVspLs9K8QEA': { description: "New task2", dueDate: 1525474800000, priority: 2, title: "New task2" },
                        '-LBeIatjfY42lZmuKIET': { description: "New task3", dueDate: 1527202800000, priority: 3, title: "New task3" }
                    }
                }
            });

            // Check dispatched actions contains our passed data.
            expect(dispatched).toEqual(expect.arrayContaining([
                {
                    type: REPLACE_TASKS,
                    payload: [
                        {key: '-LB_HIvA0iwEXaw-Rbit', description: "New task1", dueDate: 1525561200000, priority: 1, title: "New task1"},
                        {key: '-LB_HmNEyVspLs9K8QEA', description: "New task2", dueDate: 1525474800000, priority: 2, title: "New task2"},
                        {key: '-LBeIatjfY42lZmuKIET', description: "New task3", dueDate: 1527202800000, priority: 3, title: "New task3"}
                    ]
                }
            ]));

        });

    });

});
