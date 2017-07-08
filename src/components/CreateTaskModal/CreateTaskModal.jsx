import React from 'react';

class CreateTaskModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			taskText: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.close = this.close.bind(this);
	}

	handleChange(event) {
		this.setState({taskText: event.target.value});
	}

	handleSubmit(event) {
		this.props.addTask(this.state.taskText);
		event.preventDefault();
	}

	close(e) {
		e.preventDefault();

		if (this.props.onClose) {
			this.props.onClose();
		}
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
						<input type="text" value={this.state.taskText} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
			
			<div style={backdropStyle} onClick={e => this.close(e)}></div>
		</div>
		);
	}
}

export default CreateTaskModal;