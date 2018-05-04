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

function createEventChannel() {
    
    const tasksRef = database.ref('/tasks/' + auth.currentUser.uid);
    
    const listener = eventChannel(emit => {

        // Tasks recieved
        tasksRef.orderByChild("dueDate")
        .startAt(new Date().getTime())
        .on('value', data => {
            data = data.val();
            let tasks = [];
            for (let key in data) {
                let task = data[key];
                task.key = key;
                tasks.push(task);
            }
            emit({ type: REPLACE_TASKS, payload: tasks });
        });

        return () => tasksRef.off();

    });
    
    return listener;

}

function* subscribeToTasks() {
    
    // Create channel.
    const chan = createEventChannel();

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