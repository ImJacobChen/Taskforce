import { GET_TASKS, ADD_TASK, DELETE_TASK } from './constants';

export function getTasks() {
    return {
        type: GET_TASKS
    }
}

export function addTask(task) {
    return {
        type: ADD_TASK,
        payload: task
    }
}

export function deleteTask(task) {
    return {
        type: DELETE_TASK,
        payload: task
    }
}