import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addTask} from '../../actions/taskActions';
import './CreateTaskModal.css';

export class CreateTaskModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			taskTitle: '',
			taskDescription: '',
			taskDueDate: '',
		};

		this.handleTaskTitleChange = this.handleTaskTitleChange.bind(this);
		this.handleTaskDescriptionChange = this.handleTaskDescriptionChange.bind(this);
		this.handleTaskDueDateChange = this.handleTaskDueDateChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.close = this.close.bind(this);
	}

	handleTaskTitleChange(event) {
		this.setState({taskTitle: event.target.value});
	}

	handleTaskDescriptionChange(event) {
		this.setState({taskDescription: event.target.value});
	}

	handleTaskDueDateChange(event) {
		this.setState({taskDueDate: event.target.value});
		//TODO: If date is less than today. Show error.
	}

	handleSubmit(event) {
		event.preventDefault()

		let task = {
			title: this.state.taskTitle,
			dueDate: this.state.taskDueDate,
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

		this.props.addTask(task)
		this.close()
	}

	close() {
		if (this.props.onClose) {
			this.props.onClose();
			this.setState({
				taskTitle: '',
				taskDescription: '',
				taskDueDate: '',
			});
		}
	}

	render() {
		if (this.props.isOpen === false) return null

		return (
		<div>
			<div className='modal'>
				<button onClick={this.close}>Close</button>
				<form onSubmit={this.handleSubmit}>
					<label>
						Title:
						<input type="text" value={this.state.taskTitle} onChange={this.handleTaskTitleChange} />
					</label>
					<br /><br />
					<label>
						Due Date:
						<input type='date' value={this.state.taskDueDate} onChange={this.handleTaskDueDateChange} />
					</label>
					<br /><br />
					<label>
						Description:
						<textarea value={this.state.taskDescription} onChange={this.handleTaskDescriptionChange}></textarea>
					</label>
					<br /><br />
					<input type="submit" value="Submit" />
				</form>
			</div>
			
			<div className='backdrop' onClick={e => this.close(e)}></div>
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
	return bindActionCreators({addTask: addTask}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskModal);