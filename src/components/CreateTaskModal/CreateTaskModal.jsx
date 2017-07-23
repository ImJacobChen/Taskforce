import React from 'react';
import fire from '../../fire';

var database = fire.database();

class CreateTaskModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			taskText: '',
			taskDueDate: '',
			taskPriority: '1',
			taskDescription: ''
		};

		this.handleTaskTextChange = this.handleTaskTextChange.bind(this);
		this.handleTaskDueDateChange = this.handleTaskDueDateChange.bind(this);
		this.handleTaskPriorityChange = this.handleTaskPriorityChange.bind(this);
		this.handleTaskDescriptionChange = this.handleTaskDescriptionChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.close = this.close.bind(this);

		this.addTask = this.addTask.bind(this);
	}

	handleTaskTextChange(event) {
		this.setState({taskText: event.target.value});
	}

	handleTaskDueDateChange(event) {
		console.log(event.target.value);
		this.setState({taskDueDate: event.target.value});
	}

	handleTaskPriorityChange(event) {
		this.setState({taskPriority: event.target.value});
	}

	handleTaskDescriptionChange(event) {
		this.setState({taskDescription: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();

		let task = {
			taskText: this.state.taskText,
			taskDueDate: this.state.taskDueDate,
			taskPriority: this.state.taskPriority,
			taskDescription: this.state.taskDescription
		}

		this.addTask(task);
		this.close();
	}

	close() {
		if (this.props.onClose) {
			this.props.onClose();
		}
	}

	addTask(task) {
		var currentUser = fire.auth().currentUser.uid;
		database.ref(currentUser + '/tasks').push(task);
	}

	render() {
		if (this.props.isOpen === false) return null

		let modalStyle = {
			width: '75%',
			height: '50%',
			backgroundColor: '#fff',
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			zIndex: '9999',
			background: '#fff'
		}

		let backdropStyle = {
			position: 'absolute',
			width: '100%',
			height: '100%',
			top: '0px',
			left: '0px',
			zIndex: '9998',
			background: 'rgba(0, 0, 0, 0.3)'
		}

		return (
		<div>
			<div style={modalStyle}>
				<button onClick={this.close}>Close</button>
				<form onSubmit={this.handleSubmit}>
					<label>
						Name:
						<input type="text" value={this.state.taskText} onChange={this.handleTaskTextChange} />
					</label>
					<br /><br />
					<label>
						Date:
						<input type="date" onChange={this.handleTaskDueDateChange} /> 
					</label>
					<br /><br />
					<label>
						Priority:
						<select selected={this.state.taskPriority} onChange={this.handleTaskPriorityChange}>
							<option value='1'>Normal (1)</option>
							<option value='2'>(2)</option>
							<option value='3'>(3)</option>
							<option value='4'>(4)</option>
							<option value='5'>High (5)</option>
						</select>
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
			
			<div style={backdropStyle} onClick={e => this.close(e)}></div>
		</div>
		);
	}
}

export default CreateTaskModal;