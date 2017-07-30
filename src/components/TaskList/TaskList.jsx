import React from 'react';
import fire from '../../fire';
import moment from 'moment';

import Task from '../Task/Task';

const database = fire.database();

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