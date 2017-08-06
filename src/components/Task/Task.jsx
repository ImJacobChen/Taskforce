import React from 'react';

const Task = function(props) {
    return (
        <li className="task">
            {props.title}
        </li>
    );
}

export default Task;