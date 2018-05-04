import React from 'react';
import './CreateTaskModal.css';

import moment from 'moment';

import { addTask } from '../../redux/actions/taskActions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class CreateTaskModal extends React.Component {
	constructor(props) {

		super(props);

		this.state = {
			taskTitle: '',
			taskDescription: '',
			taskDueDate: '',
			taskPriority: 0
		};

		this.handleTaskTitleChange = this.handleTaskTitleChange.bind(this);
		this.handleTaskDueDateChange = this.handleTaskDueDateChange.bind(this);
		this.handleTaskPriorityChange = this.handleTaskPriorityChange.bind(this);
		this.handleTaskDescriptionChange = this.handleTaskDescriptionChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.close = this.close.bind(this);

	}

	handleTaskTitleChange(event) {
		this.setState({taskTitle: event.target.value});
	}

	handleTaskDueDateChange(event) {
		this.setState({taskDueDate: event.target.value});
		//TODO: If date is less than today. Show error.
	}

	handleTaskPriorityChange(event) {
		this.setState({taskPriority: event.target.value});
	}

	handleTaskDescriptionChange(event) {
		this.setState({taskDescription: event.target.value});
	}

	handleSubmit() {

		let task = {
			title: this.state.taskTitle,
			dueDate: moment(this.state.taskDueDate).valueOf(),
			priority: parseInt(this.state.taskPriority, 10),
			description: this.state.taskDescription
		}

		if (task.title === '' || task.title === null) {
			alert('You need to enter a title'); 
			return;
		}

		if (task.dueDate === '' || task.dueDate === null) {
			alert('You need to enter a due date'); 
			return;
		}

		this.props.addTask(task);
		this.close();
	}

	close() {
		if (this.props.onClose) {
			this.props.onClose();
			this.setState({
				taskTitle: '',
				taskDescription: '',
				taskDueDate: '',
				taskPriority: 0
			});
		}
	}

	render() {
		
		if (this.props.isOpen === false) {
			return null
		}
		
		return (
			<div>
				<div className="modal">
					<button className="modal__close-btn" onClick={this.close}>Close</button>
					<div className="modal__form">
						<label>
							Title:
							<input 
								type="text" 
								value={this.state.taskTitle} 
								onChange={this.handleTaskTitleChange} 
								autoFocus />
						</label>
						<br /><br />
						<label>
							Due Date:
							<input type="date" value={this.state.taskDueDate} onChange={this.handleTaskDueDateChange} />
						</label>
						<br /><br />
						<label>
							Priority:
							<select value={this.state.taskPriority} onChange={this.handleTaskPriorityChange}>
								<option value={0}>Top</option>
								{this.props.tasks.map((task, index) => {
									return <option key={index} value={index}>(Higher than) {task.title}</option>;
								})}
								<option value={this.props.tasks.length}>Last</option>
							</select>
						</label>
						<br /><br />
						<label>
							Description:
							<textarea value={this.state.taskDescription} onChange={this.handleTaskDescriptionChange}></textarea>
						</label>
						<br /><br />
						<button className="modal__submit-btn" onClick={this.handleSubmit}>Submit</button>
					</div>
				</div>
				
				<div className="backdrop" onClick={e => this.close(e)}></div>
			</div>
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
        addTask
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskModal);