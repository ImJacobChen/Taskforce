import fire from '../fire';
import { GET_TASKS, ADD_TASK, RECEIVE_TASK, DELETE_TASK } from './constants';

var tasks = null;


export function getTasks() {
    return {
        type: GET_TASKS
    }
}

export function addTask(task) {
    let userId = fire.auth().currentUser.uid;
    let tasks = fire.database().ref(userId + '/tasks');
    
    if (tasks !== null || userId !== null) {
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