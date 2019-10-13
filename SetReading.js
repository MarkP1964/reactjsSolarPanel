import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import axios from 'axios';
import './site.css';
import './site.js';

const btnStyle = {
	float: 'right',
}


class SetReading extends Component {
	constructor(props) {
		super(props);
		this.state = {
			action: this.props.url + "SetReading",
			date : new Date().toDateInputValue(),
			value: 32000,
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
		data = {Date: this.state.date, Reading: this.state.value };
		//this.postAjax(data);
		this.postReading(JSON.stringify(data));
				
	}
	
	postAjax(postJson) {
		
		var data = JSON.stringify({
		  "Date": "2019-06-16",
		  "Reading": 27578.6
		});

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function () {
		  if (this.readyState === 4) {
			console.log(this.responseText);
		  }
		});

		xhr.open("POST", "http://ull:2314/solarpanelapi/setreading");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.15.0");
		xhr.setRequestHeader("Accept", "*/*");
		xhr.setRequestHeader("Cache-Control", "no-cache");
		xhr.setRequestHeader("Postman-Token", "263ac499-3998-4c77-9af3-d1d69c5a30e9,faf32bfb-26be-4765-b726-ea4d2788e76c");
		xhr.setRequestHeader("Host", "ull:2314");
		xhr.setRequestHeader("accept-encoding", "gzip, deflate");
		xhr.setRequestHeader("content-length", "46");
		xhr.setRequestHeader("Connection", "keep-alive");
		xhr.setRequestHeader("cache-control", "no-cache");

		xhr.send(data);	
	}
	
	postReading(postJson) {
		fetch(this.state.action, {
			method: 'POST',
			headers: {'Content-Type' : 'application/json' },
			body: postJson
		}).then(
			(result) => {
				this.handleClose();
			},
			(error) => {
				alert("ERROR:" + error)
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