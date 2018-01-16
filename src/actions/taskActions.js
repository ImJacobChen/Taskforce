import fire from '../fire';
import { RECEIVE_TASK, DELETE_TASK, LOADING_TASKS, LOADING_TASKS_SUCCESS } from '../constants/taskConstants';

export function addTask(task) {
    let userId = fire.auth().currentUser.uid;
    let tasks = fire.database().ref(userId + '/tasks');

    if (tasks !== null || userId !== null) {
        return function() {
            tasks.push(task);
        }
    }
}

export function receiveTask(task) {
    return {
        type: RECEIVE_TASK,
        payload: task
    }
}

export function subscribeToTasks() {
    return function(dispatch) {
        dispatch(loadingTasks());
        let userId = fire.auth().currentUser.uid;
        let tasks = fire.database().ref(userId + '/tasks');
        tasks.on('child_added', data => {
            dispatch(loadingTasksSuccess());
            let task = data.val();
            task.key = data.key;
            dispatch(receiveTask(task));
        });
    }
}

export function deleteTask(task) {
    return {
        type: DELETE_TASK,
        payload: task
    }
}

export function loadingTasks() {
    return {
        type: LOADING_TASKS
    }
}

export function loadingTasksSuccess() {
    return {
        type: LOADING_TASKS_SUCCESS
    }
}