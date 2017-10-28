import React from 'react';
import './TaskList.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addTask, subscribeToTasks} from '../../actions/taskActions';

import Task from '../Task/Task';

const LoadingSpinner = (props) => {
    return (
        <div className='loading-overlay'><div className='loading-spinner'></div></div>
    );
}

const TaskSeperator = (props) => {
    return (
        <li className='taskSeperator' key={props.date}>
            <span className='taskSeperator__text'>{props.date}</span>
            <span className='taskSeperator__line'></span>
        </li>
    );
}

export class TaskList extends React.Component {
    componentDidMount() {
        this.props.subscribeToTasks();
    }

    render() {
        const tasks = this.props.tasks.map(function(task) {
            return (
                <Task key={task.key} title={task.title} dueDate={task.dueDate} description={task.description} />
            );
        });

        //Tasks ordered by due date
        const tasksToSortByDueDate = this.props.tasks.slice(0);
        tasksToSortByDueDate.sort(function(a, b) {
            return (new Date(a.dueDate) > new Date(b.dueDate));
        });
        const tasksOrderedByDueDate = tasksToSortByDueDate.map(function(task) {
            return (
                <Task key={task.key} title={task.title} dueDate={task.dueDate} description={task.description} />
            );
        });

        // Grouped by date tasks object
        const tasksGroupedAndSeperatedByDate = [];
        const sortedTasksObject = {};
        let taskDueDate = null;

        tasksToSortByDueDate.forEach(function(task) {

            /**
             * If the date is in the past then skip to the next
             * date.
             * 
             * Else if the task.dueDate is different to the stored ^
             * due date then create a new node on the sorted
             * tasks object and add the task
             * 
             * Else add the task to the node which already has
             * the same date as the task to be added.
             */
            if (new Date(task.dueDate) < new Date()) {
                return;
            }
            else if (task.dueDate !== taskDueDate) {
                sortedTasksObject[task.dueDate] = [task];
            } 
            else if (task.dueDate === taskDueDate) {
                sortedTasksObject[task.dueDate].push(task);
            }

            /**
             * Update the stored taskDueDate with the latest
             * task.dueDate
             */
            taskDueDate = task.dueDate;
        });

        /**
         * Loop through the sorted tasks object and add the tasks
         * to the tasksGroupedAndSeperatedByDate[] array. When
         * it encounters the next node in the object with a 
         * new date - add a <TaskSeperator /> with that date.
         */
        for (var key in sortedTasksObject) {
            // Create seperator with object key (due date).
            tasksGroupedAndSeperatedByDate.push(<TaskSeperator key={key} date={key} />);

            // Add the tasks falling under this date
            sortedTasksObject[key].forEach(function(task) {
                tasksGroupedAndSeperatedByDate
                    .push(<Task key={task.key} title={task.title} dueDate={task.dueDate} description={task.description} />);
            });

        }
        // Return
        return (
            (this.props.loadingTasks === true) 
            ? <LoadingSpinner />
            : (tasksOrderedByDueDate.length <= 0)
                ? <h2>Uh oh... You have no tasks. Create some now :D</h2>
                : <ul className="tasks">{tasksOrderedByDueDate}</ul>
        );
   }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks.tasks,
        loadingTasks: state.tasks.loadingTasks
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addTask: addTask,
        subscribeToTasks: subscribeToTasks
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);