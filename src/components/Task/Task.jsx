import React from 'react';

class Task extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="task">
                {this.props.title}
            </li>
        );
    }
}

export default Task;