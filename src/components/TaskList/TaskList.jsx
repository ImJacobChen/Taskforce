import React from 'react';
import fire from '../../fire';
import moment from 'moment';

import Task from '../Task/Task';

const database = fire.database();

const TasksSeperator = function(props) {
    return (
        <li className='task-seperator'>
            <p>{props.text}</p>
            <div></div> 
        </li>
    );
}

class TaskList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
        }

        this.refreshTasks = this.refreshTasks.bind(this);
    }

    componentWillMount() {
        var self = this;

        var tasksRef = database.ref(this.props.user.uid + '/tasks');

        tasksRef.on('child_added', function(data) {
          self.refreshTasks();
        });

        tasksRef.on('child_changed', function(data) {
          self.refreshTasks();
        });
    
        tasksRef.on('child_removed', function(data) {
          self.refreshTasks();
        });
    }

    deleteTask(taskKey) {
        var tasksRef = database.ref(this.props.user.uid + '/tasks');
        tasksRef.child(taskKey).remove();
    }

    refreshTasks() {
        var tasks = [];

        var tasksRef = database.ref(this.props.user.uid + '/tasks');
        tasksRef.once('value', function(snapshot) {
            snapshot.forEach(function(child) {
                var task = child.val();
                task.key = child.key;
                tasks.push(task);
            });
        });

        this.setState({ tasks: tasks });
    }

   render() {
        var tasks = this.state.tasks;
        var tasksLength = tasks.length;
        var structuredTasks = [];
        
        // Sort tasks in date order.
        tasks.sort(function(a, b) {
            return new Date(a.taskDueDate).getTime() - new Date(b.taskDueDate).getTime()
        });

        // Begin with today element in task list
        structuredTasks.push(<TasksSeperator key='today' text='today' />);

        var previousTaskDate = moment();

        for(var i=0; i<tasksLength; i++) {
            var task = tasks[i];

            var today = moment();
            var taskDate = moment(task.taskDueDate);

            // If taskDate is same as today
            if (taskDate.isSame(previousTaskDate, 'day')) {
                structuredTasks.push(<Task key={task.key} task={task.taskText} taskKey={task.key} deleteTask={this.deleteTask.bind(this)} />);
            } else {
                if (!taskDate.isBefore(today)) {
                    //structuredTasks.push(<TasksSeperator text={today.to(taskDate)} />);
                    structuredTasks.push(<Task key={task.key} task={task.taskText} taskKey={task.key} deleteTask={this.deleteTask.bind(this)} />);
                }
            }

            previousTaskDate = taskDate;
        }

        return (
            <ul className="tasks">
            {structuredTasks}
            </ul>
        );
   }
}

export default TaskList;