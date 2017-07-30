import fire from '../fire';
import user from '../fire';
import { GET_TASKS, ADD_TASK, RECEIVE_TASK, DELETE_TASK } from './constants';

if (user) {
    const tasks = fire.database.ref(user.id + '/tasks');
}


export function getTasks() {
    return {
        type: GET_TASKS
    }
}

export function addTask(task) {
    return function() {
        tasks.push(task);
    }
}

export function deleteTask(task) {
    return {
        type: DELETE_TASK,
        payload: task
    }
}