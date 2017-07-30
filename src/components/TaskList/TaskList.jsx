import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTasks, addTask, subscribeToTasks, deleteTask} from '../../actions/taskActions';

import fire from '../../fire';
import moment from 'moment';

import Task from '../Task/Task';

const database = fire.database();

class TaskList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.subscribeToTasks();
    }

    render() {
        const tasks = this.props.tasks.map(function(task) {
            console.log(task);
            return (
                <Task key={task.id} title={task.title} />
            );
        });

        return (
            <ul className="tasks">
                {tasks}
            </ul>
        );
   }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks.tasks
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addTask: addTask,
        subscribeToTasks: subscribeToTasks
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);