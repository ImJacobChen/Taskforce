import React from 'react';
import './Task.css';

const Task = function(props) {
    return (
        <li className="task">
            {props.title}
            <span className='task__dueDate'>{props.dueDate}</span>
        </li>
    );
}

export default Task;