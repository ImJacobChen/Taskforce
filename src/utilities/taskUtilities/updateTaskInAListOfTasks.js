export default function(tasks, task) {
    let newTasks = tasks.slice();
    const newTasksLength = newTasks.length;

    for (let i=0; i<newTasksLength; i++) {
        if (newTasks[i].key === task.key) {
            newTasks[i] = task;
            break;
        }
    }

    return newTasks;
}