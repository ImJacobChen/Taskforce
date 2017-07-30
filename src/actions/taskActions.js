import fire from '../fire';
import { GET_TASKS, ADD_TASK, RECEIVE_TASK, DELETE_TASK } from './constants';

var tasks = null;

if (user) {
    console.log(user.uid);
    tasks = fire.database().ref(user.uid + '/tasks');
} 


export function getTasks() {
    return {
        type: GET_TASKS
    }
}

export function addTask(task) {
    if (tasks) {
        return function() {
            tasks.push(task);
        }
    }
}

export function deleteTask(task) {
    return {
        type: DELETE_TASK,
        payload: task
    }
}