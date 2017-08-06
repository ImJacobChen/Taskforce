import { ADD_TASK, RECEIVE_TASK, DELETE_TASK, LOADING_TASKS, LOADING_TASKS_SUCCESS } from '../constants/task-constants';

const initialState = {
    tasks: [],
    loadingTasks: false
};

export function taskReducers(state = initialState, action) {
    switch(action.type) {

        case ADD_TASK: 
            let tasks = state.tasks.concat(action.payload);
            return state = {tasks};

        case RECEIVE_TASK:
            return Object.assign({}, state, {
                tasks: state.tasks.concat([action.payload])
            });

        case DELETE_TASK:
            const tasksToDelete = state.tasks.slice(0);

            const indexToDelete = tasksToDelete.findIndex(
                function(task) {
                    return task.id === action.payload.id;
                }
            );

            let newTasks = tasksToDelete.splice(indexToDelete, 1);
            return state = {tasks: newTasks};

        case LOADING_TASKS:
            return Object.assign({}, state, {
                loadingTasks: true,
            });

        case LOADING_TASKS_SUCCESS:
            return Object.assign({}, state, {
                loadingTasks: false,
            });
        
        default:
            return state;
    }
}