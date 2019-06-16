import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import './site.css';
import './site.js';

const btnStyle = {
	float: 'right',
}


class SetReading extends Component {
	constructor(props) {
		super(props);
		this.state = {
			action: this.props.url + "setreading",
			date : new Date().toDateInputValue(),
			value: null,
			show: false,
		};
		this.handleSaveAndClose = this.handleSaveAndClose.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.changeReading = this.changeReading.bind(this);
		this.changeDate = this.changeDate.bind(this);
	};
	
	changeReading(event) {
		this.setState({value: event.target.value});
	}
	
	changeDate(event) {
		this.setState({date: event.target.value});
	}
	
	handleClose()  {
		this.setState({show: false});
	}
	
	handleShow()  {
		this.setState({show: true});
	}
	
	handleSaveAndClose() {
		var data = JSON.stringify({
			'Date': this.state.date,
			'Reading': this.state.value,
		});
		
		this.postReading(data);
				
	}
	
	postReading(postJson) {
		fetch(this.state.action, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, cors, *same-origin
			credentials: 'omit',
			headers: {
				'Content-Type': 'application/json',
			},
			body: postJson
		}).then(
			(result) => {
				alert(result);
				this.handleClose();
			},
			(error) => {
				alert(error)
				this.handleClose();	
			}
		);
	}
	
	render() {
	  return (
	  <>
		<button class="btn btn-primary btn-sm" style={btnStyle} onClick={this.handleShow}>Set readings</button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Set readings...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
			<div class='col-md-12'>
				<div class="input-group mb-3">
					<div class="input-group-prepend">
						<span class="input-group-text">Reading</span>
					</div>
					<input 
					type="number" 
					class="form-control" 
					value = {this.state.value}
					placeholder="Reading"
					onChange = {this.changeReading} />
				</div>
				<div class="input-group mb-3">
					<div class="input-group-prepend">
						<span class="input-group-text">Reading Date</span>
					</div>
					<input 
					type="date" 
					class="form-control" 
					placeholder="Reading date" 
					value = {this.state.date} />
				</div>
			</div>
		  </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSaveAndClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
		
	  </>
	  );
	}	
}

export default SetReading