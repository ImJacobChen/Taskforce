import deleteTaskInAListOfTasks from './deleteTaskInAListOfTasks';

describe('deleteTasksInAListOfTasks()', () => {

    test('It deletes a task from a list of tasks', () => {

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

        expect(deleteTaskInAListOfTasks(tasks, 2)).toEqual([
            {
                key: 1,
                title: 'title1',
                description: 'description1'
            },
            {
                key: 3,
                title: 'title3',
                description: 'description3'
            }
        ]);

    });

    test('It deletes a task from a list of 1 task', () => {
        expect(
            deleteTaskInAListOfTasks([
                {
                    key: 1,
                    title: 'title1',
                    description: 'description1'
                }
            ], 1)
        ).toEqual(
            []
        );
    });

});