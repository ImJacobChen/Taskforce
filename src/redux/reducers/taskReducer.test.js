import reducer from './taskReducer';
import * as taskConstants from '../constants/taskConstants';

const initialState = {
    tasks: [],
    tasksState: 'idle'
};

describe('taskReducer', () => {

    test('It returns the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(
            initialState
        );
    });

    test('It handles RECEIVE_TASK', () => {
        const task = {
            key: 1,
            title: 'title',
            description: 'description'
        };
        expect(
            reducer(initialState, {
                type: taskConstants.RECEIVE_TASK,
                payload: task
            })
        ).toEqual(
            {
                tasks: [ task ],
                tasksState: 'idle'
            }
        )
    });

    test('It handles UPDATE_TASK', () => {
        
        // Updating 1 task in a list of 3
        expect(
            reducer(
                {
                    tasks: [
                        {
                            key: 1,
                            title: 'title1',
                            description: 'description1'
                        },
                        {
                            key: 2,
                            title: 'title2',
                            description: 'description2'
                        },
                        {
                            key: 3,
                            title: 'title3',
                            description: 'description3'
                        }
                    ],
                    tasksState: 'idle'
                },
                {
                    type: taskConstants.UPDATE_TASK,
                    payload: {
                        key: 2,
                        title: 'title2updated',
                        description: 'description2updated'
                    }
                }
            )
        ).toEqual(
            {
                tasks: [
                    {
                        key: 1,
                        title: 'title1',
                        description: 'description1'
                    },
                    {
                        key: 2,
                        title: 'title2updated',
                        description: 'description2updated'
                    },
                    {
                        key: 3,
                        title: 'title3',
                        description: 'description3'
                    }
                ],
                tasksState: 'idle'
            }
        );

        // Updating 1 task in a list of 1
        expect(
            reducer(
                {
                    tasks: [
                        {
                            key: 1,
                            title: 'title1',
                            description: 'description1'
                        }
                    ],
                    tasksState: 'idle'
                },
                {
                    type: taskConstants.UPDATE_TASK,
                    payload: {
                        key: 1,
                        title: 'title1updated',
                        description: 'description1updated'
                    }
                }
            )
        ).toEqual(
            {
                tasks: [
                    {
                        key: 1,
                        title: 'title1updated',
                        description: 'description1updated'
                    }
                ],
                tasksState: 'idle'
            }
        );

    });

    test('It handles REPLACE_TASKS', () => {

        const oldTasks = [
            {
                key: 1,
                title: 'title1',
                description: 'description1'
            },
            {
                key: 2,
                title: 'title2',
                description: 'description2'
            }
        ];

        const newTasks = [
            {
                key: 1,
                title: 'title1 new',
                description: 'description1 new'
            },
            {
                key: 2,
                title: 'title2 new',
                description: 'description2 new'
            }
        ];

        expect(
            reducer(
                { 
                    tasks: oldTasks, 
                    tasksState: 'idle' 
                },
                {
                    type: taskConstants.REPLACE_TASKS,
                    payload: newTasks
                }
            )
        ).toEqual(
            { 
                tasks: newTasks, 
                tasksState: 'idle' 
            }
        );

    });

});