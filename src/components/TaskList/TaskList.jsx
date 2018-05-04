import React from 'react';
import './TaskList.css';

import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    receiveTask,
    loadingTasks,
    loadingTasksSuccess,
    loadingTasksFailed,
    subscribeToTasks,
    unsubscribeToTasks
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
            <span className='taskSeperator__text'>{moment(parseInt(props.date, 10)).format("Do MMMM")}</span>
            <span className='taskSeperator__line'></span>
        </li>
    );
}

const sort_options = {
    date_unset_dates_first: 'Date (Unset dates first)',
    date_set_dates_first: 'Date (Set dates first)',
    priority: 'Priority'
};

class FilterBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            dropdownListIsActive: false,
            sortOption: 'date_unset_dates_first'
        };

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.toggleDropdownList = this.toggleDropdownList.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(e) {
        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            this.setState({
                dropdownListIsActive: false,
            });
        }
    }

    toggleDropdownList() {
        this.setState((prevState, props) => ({
            dropdownListIsActive: !prevState.dropdownListIsActive
        }));
    }

    render() {
        return (
            <div className="filter-bar">
                <div ref={this.setWrapperRef} className="dropdown" onClick={this.toggleDropdownList}>
                    <div className="dropdown__title">Sort by: <b>{sort_options[this.state.sortOption]}</b></div>
                    <ul className={(this.state.dropdownListIsActive) ? "dropdown__list dropdown__list--active" : "dropdown__list"}>
                        {Object.keys(sort_options).map((key, index) => {
                            return <li className="dropdown__list__item" key={index}>{sort_options[key]}</li>;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export class TaskList extends React.Component {

    componentDidMount() {

        this.props.loadingTasks();

        try {
            this.props.subscribeToTasks();
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
                    ? 
                    <h2>Oh... You have no tasks. Create some now :D</h2>
                    : 
                    <div>
                        <FilterBar />
                        <ul className="tasks">{tasksGroupedAndSeperatedByDate}</ul>
                    </div>
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
        loadingTasksFailed,
        subscribeToTasks,
        unsubscribeToTasks
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);