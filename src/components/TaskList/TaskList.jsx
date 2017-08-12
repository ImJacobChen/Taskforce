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

class TaskList extends React.Component {
    componentDidMount() {
        this.props.subscribeToTasks();
    }

    render() {
        const tasks = this.props.tasks.map(function(task) {
            return (
                <Task key={task.key} title={task.title} dueDate={task.dueDate} />
            );
        });

        const tasksToSortByDueDate = this.props.tasks.slice(0);
        tasksToSortByDueDate.sort(function(a, b) {
            return (new Date(a.dueDate) > new Date(b.dueDate));
        });
        const tasksOrderedByDueDate = tasksToSortByDueDate.map(function(task) {
            return (
                <Task key={task.key} title={task.title} dueDate={task.dueDate} />
            );
        });

        return (
            (this.props.loadingTasks === true) 
            ? <LoadingSpinner />
            : <ul className="tasks">
                {tasksOrderedByDueDate}
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