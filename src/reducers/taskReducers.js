import { GET_TASKS, ADD_TASK, RECEIVE_TASK, DELETE_TASK } from '../actions/constants';

export function taskReducers(state={tasks:[
    {
        id: 1,
        title: 'Task title',
        description: 'Task description'
    }
]}, action) {
    switch(action.type) {
        case GET_TASKS:
            return {...state, tasks:[...state.tasks]};

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
        
        default:
            return state;
    }
}