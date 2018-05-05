export default function(tasks, taskKey) {

    let tasksCopy = tasks.slice();
    let tasksLength = tasksCopy.length;
    
    let index;

    for (let i=0; i<tasksLength; i++) {
        if (tasksCopy[i].key === taskKey) {
            index = i;
        }
    }

    if (index >= 0) {
        tasksCopy.splice(index, 1);
    }

    return tasksCopy;

}