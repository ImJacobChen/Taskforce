import React from 'react';
import './TaskList.css';

import moment from 'moment';
import {fire} from '../../fire';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    receiveTask,
    loadingTasks,
    loadingTasksSuccess,
    loadingTasksFailed
} from '../../redux/actions/taskActions';

import Task from '../Task/Task';

const LoadingSpinner = (props) => {
    return (
        <div className='loading-overlay'><div className='loading-spinner'></div></div>
    );
}

const TaskSeperator = (props) => {
    return (
        <li className='taskSeperator' key={props.date}>
            <span className='taskSeperator__text'>{moment(parseInt(props.date)).format("Do MMMM")}</span>
            <span className='taskSeperator__line'></span>
        </li>
    );
}

export class TaskList extends React.Component {

    componentDidMount() {

        let self = this;
        let first
        this.props.loadingTasks();

        try {

            let tasks = fire.database().ref('/tasks/' + fire.auth().currentUser.uid);

            tasks
            .orderByChild("dueDate")
            .startAt(new Date().getTime())
            .on('child_added', function(data) {
                let task = data.val();
                task.key = data.key;
                self.props.receiveTask(task);
            });

            this.props.loadingTasksSuccess();

        } catch(err) {

            this.props.loadingTasksFailed(err);

        }
        
    }

    render() {
        const tasks = this.props.tasks.map(function(task) {
            return (
                <Task key={task.key} title={task.title} dueDate={task.dueDate} description={task.description} priority={task.priority} />
            );
        });

        //Tasks ordered by due date
        const tasksToSortByDueDate = this.props.tasks.slice(0);
        tasksToSortByDueDate.sort(function(a, b) {
            return (new Date(a.dueDate) > new Date(b.dueDate));
        });
        const tasksOrderedByDueDate = tasksToSortByDueDate.map(function(task) {
            return (
                <Task key={task.key} title={task.title} dueDate={task.dueDate} description={task.description} priority={task.priority} />
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

            sortedTasksObject[key].sort(function(a, b) {
                return b.priority < a.priority;
            });

            // Add the tasks falling under this date
            sortedTasksObject[key].forEach(function(task) {
                tasksGroupedAndSeperatedByDate
                    .push(<Task key={task.key} title={task.title} dueDate={task.dueDate} description={task.description} priority={task.priority} />);
            });

        }
        // Return
        if (this.props.tasksState === 'loading') {
            return <LoadingSpinner />
        } else if (this.props.tasksState === 'failed') {
            return (
                <h2>Failed to load tasks</h2>
            );
        } else {
            return (
                (tasksGroupedAndSeperatedByDate.length <= 0)
                    ? <h2>Oh... You have no tasks. Create some now :D</h2>
                    : <ul className="tasks">{tasksGroupedAndSeperatedByDate}</ul>
            );
        }
   }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks.tasks,
        tasksState: state.tasks.tasksState
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        receiveTask,
        loadingTasks,
        loadingTasksSuccess,
        loadingTasksFailed
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);