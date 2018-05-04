import updateTaskInAListOfTasks from './updateTaskInAListOfTasks';

describe('updateTaskInAListOfTasks()', () => {
    
    test('It updates a task in a list of tasks and returns a new list', () => {

        const tasks = [
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
        ];

        const updatedTask = {
            key: 1,
            title: 'title1updated',
            description: 'description1updated'
        };

        const newTasks = updateTaskInAListOfTasks(tasks, updatedTask);

        expect(newTasks).toEqual([
            {
                key: 1,
                title: 'title1updated',
                description: 'description1updated'
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
        ])


    });

});