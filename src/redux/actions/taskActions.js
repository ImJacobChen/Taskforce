import { 
    ADD_TASK,
    RECEIVE_TASK,
    UPDATE_TASK,
    REPLACE_TASKS,
    DELETE_TASK,
    SUBSCRIBE_TO_TASKS,
    UNSUBSCRIBE_TO_TASKS,
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

export function updateTask(task) {
    return {
        type: UPDATE_TASK,
        payload: task
    }
}

export function replaceTasks(tasks) {
    return {
        type: REPLACE_TASKS,
        payload: tasks
    }
}

export function deleteTask(task) {
    return {
        type: DELETE_TASK,
        payload: task
    }
}

export function subscribeToTasks() {
    return {
        type: SUBSCRIBE_TO_TASKS
    }
}

export function unsubscribeToTasks() {
    return {
        type: UNSUBSCRIBE_TO_TASKS
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