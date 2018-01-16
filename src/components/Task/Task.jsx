import React, {Component} from 'react';
import './Task.css';

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            isExpanded: !this.state.isExpanded,
        });
    }

    render() {
        return (
            <li className={this.state.isExpanded ? 'task task--is-expanded' : 'task'} onClick={this.handleClick}>
                {this.props.title}
                
                <div className="task__content-right">
                    {(this.props.priority != null) ? (<span className="task__priority">{this.props.priority}</span>) : ''}
                    <span className='task__due-date'>{this.props.dueDate}</span>
                </div>
                
                <div className="task__expanded-content">
                    <p className="task__expanded-content__task-description">
                        {(this.props.description != "") ? this.props.description : '*No description'}
                    </p>
                </div>
            </li>
        );
    }
}

export default Task;