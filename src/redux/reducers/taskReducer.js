import { 
    RECEIVE_TASK,
    UPDATE_TASK,
    REPLACE_TASKS,
    DELETE_TASK, 
    LOADING_TASKS, 
    LOADING_TASKS_SUCCESS,
    LOADING_TASKS_FAILED
} from '../constants/taskConstants';

import updateTaskInAListOfTasks from '../../utilities/taskUtilities/updateTaskInAListOfTasks';
import deleteTaskInAListOfTasks from '../../utilities/taskUtilities/deleteTaskInAListOfTasks';

const initialState = {
    tasks: [],
    tasksState: 'idle'
};

export default function taskReducer(state = initialState, action) {
    switch(action.type) {

        case RECEIVE_TASK:
            return Object.assign({}, state, {
                tasks: state.tasks.concat([action.payload])
            });

        case UPDATE_TASK:
            return Object.assign({}, state, { 
                tasks: updateTaskInAListOfTasks(state.tasks, action.payload)
            });

        case REPLACE_TASKS:
            return Object.assign({}, state, { tasks: action.payload });

        case DELETE_TASK:
            Object.assign({}, state, {
                tasks: deleteTaskInAListOfTasks(state.tasks, action.payload.key)
            });

        case LOADING_TASKS:
            return Object.assign({}, state, {
                tasksState: 'loading',
            });

        case LOADING_TASKS_SUCCESS:
            return Object.assign({}, state, {
                tasksState: 'success',
            });

        case LOADING_TASKS_FAILED:
            return Object.assign({}, state, {
                tasksState: 'failed',
            });
        
        default:
            return state;
    }
}