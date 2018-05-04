import { takeEvery, select, apply } from 'redux-saga/effects';
import { ADD_TASK } from '../../constants/taskConstants';

import {fire} from '../../../fire';

export function* addTask(action) {
    try {
        var tasksRef = fire.database().ref('tasks/' + fire.auth().currentUser.uid);
        var taskToAdd = action.payload;
        var state = yield select();

        // Update task prioritys
        var updatedTasks = {};
        state.tasks.tasks.slice(action.payload.priority).forEach((task, index) => {
            updatedTasks[task.key] = {
                title: task.title,
                description: task.description,
                priority: index + 1,
                dueDate: task.dueDate,
            };
        });
        updatedTasks[action.payload.key] = {
            title: action.payload.title,
            description: action.payload.description,
            priority: action.payload.priority,
            dueDate: action.payload.dueDate
        }
        console.log('Updated tasks', updatedTasks);

        yield apply(tasksRef, tasksRef.update, [updatedTasks]);
        //yield apply(tasksRef, tasksRef.push, [taskToAdd]);
    } catch (err) {
        console.log(err);
    }
}

export function* addTaskWatcher() {
    yield takeEvery(ADD_TASK, addTask);
}