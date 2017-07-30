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
    }

    componentWillMount() {

    }

    deleteTask(taskKey) {

    }

    refreshTasks() {

    }

   render() {
        return (
            <ul className="tasks">
            
            </ul>
        );
   }
}

export default TaskList;