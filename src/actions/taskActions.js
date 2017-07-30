'use strict'

export function getTasks() {
    return {
        type: 'GET_TASKS'
    }
}

export function createTask(task) {
    return {
        type: 'CREATE_TASK',
        payload: task
    }
}

export function deleteTask(task) {
    return {
        type: 'DELETE_TASK',
        payload: task
    }
}