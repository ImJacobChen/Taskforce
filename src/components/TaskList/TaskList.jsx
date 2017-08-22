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
                <Task key={task.key} title={task.title} dueDate={task.dueDate} />
            );
        });

        //Tasks ordered by due date
        const tasksToSortByDueDate = this.props.tasks.slice(0);
        tasksToSortByDueDate.sort(function(a, b) {
            return (new Date(a.dueDate) > new Date(b.dueDate));
        });
        const tasksOrderedByDueDate = tasksToSortByDueDate.map(function(task) {
            return (
                <Task key={task.key} title={task.title} dueDate={task.dueDate} />
            );
        });

        // Grouped by date tasks object
        const tasksGroupedAndSeperatedByDate = [];
        const sortedTasksObject = {};
        let taskDueDate = null;
        tasksToSortByDueDate.forEach(function(task) {
            if (task.dueDate !== taskDueDate) {
                sortedTasksObject[task.dueDate] = [task];
            } else if (task.dueDate === taskDueDate) {
                sortedTasksObject[task.dueDate].push(task);
            }

            taskDueDate = task.dueDate;
        });
        for (var key in sortedTasksObject) {
            // Create seperator with object key (due date).
            tasksGroupedAndSeperatedByDate.push(<TaskSeperator key={key} date={key} />);

            // Add the tasks falling under this date
            sortedTasksObject[key].forEach(function(task) {
                tasksGroupedAndSeperatedByDate
                    .push(<Task key={task.key} title={task.title} dueDate={task.dueDate} />);
            });

        }

        // Return
        return (
            (this.props.loadingTasks === true) 
            ? <LoadingSpinner />
            : <ul className="tasks">
                {tasksGroupedAndSeperatedByDate}
            </ul>
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