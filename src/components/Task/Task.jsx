import React from 'react';

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
    }

    delete() {
        if (this.props.deleteTask) {
            this.props.deleteTask(this.props.taskKey);
        }
    }

    render() {
        return (
            <li className="task">
                {this.props.task}
                <button className="task__delete" onClick={this.delete}>Delete</button>
            </li>
        );
    }
}

export default Task;