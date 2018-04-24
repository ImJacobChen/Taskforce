import { 
    ADD_TASK,
    RECEIVE_TASK,
    DELETE_TASK,
    LOADING_TASKS, 
    LOADING_TASKS_SUCCESS,
    LOADING_TASKS_FAILED
} from '../constants/taskConstants';

export function addTask(task) {
    return {
        type: ADD_TASK,
        payload: task
    }
}

export function receiveTask(task) {
    return {
        type: RECEIVE_TASK,
        payload: task
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

export function loadingTasksFailed(err) {
    return {
        type: LOADING_TASKS_FAILED,
        payload: err
    }
}