import { eventChannel } from 'redux-saga';
import { take, put, call, fork, cancel, cancelled } from 'redux-saga/effects';
import { fire } from '../../../fire';
import {
    RECEIVE_TASK,
    UPDATE_TASK,
    REPLACE_TASKS,
    SUBSCRIBE_TO_TASKS,
    UNSUBSCRIBE_TO_TASKS
} from '../../constants/taskConstants';

const database = fire.database();
const auth = fire.auth();

export function createFirebaseEventChannel() {
    
    const tasksRef = database.ref('/tasks/' + auth.currentUser.uid);
    
    const listener = eventChannel(emit => {

        // Tasks recieved
        tasksRef.orderByChild("dueDate")
        .startAt(new Date().getTime())
        .on('value', data => {
            console.log('VALUE', data.val());
            data = data.val();
            let tasks = [];
            for (let key in data) {
                let task = data[key];
                task.key = key;
                tasks.push(task);
            }
            emit({ type: REPLACE_TASKS, payload: tasks });
        });

        tasksRef.orderByChild("dueDate")
        .startAt(new Date().getTime())
        .on('child_added', (data, prevChildKey) => {
            console.log('CHILD_ADDED', data.val(), prevChildKey);
        });

        tasksRef.orderByChild("dueDate")
        .startAt(new Date().getTime())
        .on('child_changed', (data, prevChildKey) => {
            console.log('CHILD_CHANGED', data.val(), prevChildKey);
        });

        tasksRef.orderByChild("dueDate")
        .startAt(new Date().getTime())
        .on('child_moved', (data, prevChildKey) => {
            console.log('CHILD_MOVED', data.val(), prevChildKey);
        });

        return () => tasksRef.off();

    });
    
    return listener;

}

export function* subscribeToTasks() {
    
    // Create channel.
    const chan = createFirebaseEventChannel();

    // Receive data from channel
    while (true) {
        let action = yield take(chan);
        yield put(action);
    }

}

export function* subscribeToTasksWatcher() {
    
    // Listen for SUBSCRIBE_TO_TASKS.
    yield take(SUBSCRIBE_TO_TASKS);

    // Execute subscribeToTasks().
    yield call(subscribeToTasks);   
    
}