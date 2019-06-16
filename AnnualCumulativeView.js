import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import React, {Component} from 'react';
import SetReading from  './SetReading.js';

const moment = require('moment');

const btnStyle = {
	float: 'right',
}

let shortMonth = moment.months().map(month => {
	return(
		<th id={month.substr(0,3)}>{month.substr(0,3)}</th>
	);
});


class AnnualCumulativeView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			action : this.props.url + "GetAnnualCumulativeView",
			error: null,
			isLoaded: 0,
			viewData: []
		};
		
	}

	refreshButton = () => {
		return <Button 
			onClick={this.changeTitle}
			variant = "primary"
			size="sm"
			style={btnStyle}
		>Refresh</Button>

	}
	
	changeTitle = () => {
		this.setState({isLoaded: 0 });
		this.getData(this.state.action);
	}
	
	getData = url => {
		fetch(url)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({isLoaded: 1, viewData: result});
				},
				(error) => {
					console.log(error);
					this.setState({
						isLoaded: 2,
						error
					});
				});
	}
	
	componentDidMount() {
		this.getData(this.state.action);
	}
	

	render() {
		const {error, isLoaded, viewData } = this.state;
		if(error) {
			return <div>Error: {error.message}</div>
		}
		else if(isLoaded === 0) {
			return <div>Loading...</div>
		}
		else {
		return (
		<div>
		<Table striped bordered hover size="sm" variant="dark">
			<thead>
				<tr>
					<th colspan='13' data-toggle="tooltip" title={this.props.url}><span>{this.props.viewname}</span>{this.refreshButton()}<SetReading url={this.props.url}/></th>
				</tr>
				<tr>
					<th>Year</th>
					{shortMonth}
				</tr>
			</thead>
			<tbody>
			{viewData.map(row => {
				var mon = 0;
				return (
				<tr>
					<td id={row.year.toString()}>{row.year}</td>
					<td id={row.year.toString()+'-'+((++mon).toString())}>{Math.round(row.jan).toLocaleString()}</td>
					<td id={row.year.toString()+'-'+((++mon).toString())}>{Math.round(row.feb).toLocaleString()}</td>
					<td id={row.year.toString()+'-'+((++mon).toString())}>{Math.round(row.mar).toLocaleString()}</td>
					<td id={row.year.toString()+'-'+((++mon).toString())}>{Math.round(row.apr).toLocaleString()}</td>
					<td id={row.year.toString()+'-'+((++mon).toString())}>{Math.round(row.may).toLocaleString()}</td>
					<td id={row.year.toString()+'-'+((++mon).toString())}>{Math.round(row.jun).toLocaleString()}</td>
					<td id={row.year.toString()+'-'+((++mon).toString())}>{Math.round(row.jul).toLocaleString()}</td>
					<td id={row.year.toString()+'-'+((++mon).toString())}>{Math.round(row.aug).toLocaleString()}</td>
					<td id={row.year.toString()+'-'+((++mon).toString())}>{Math.round(row.sep).toLocaleString()}</td>
					<td id={row.year.toString()+'-'+((++mon).toString())}>{Math.round(row.oct).toLocaleString()}</td>
					<td id={row.year.toString()+'-'+((++mon).toString())}>{Math.round(row.nov).toLocaleString()}</td>
					<td id={row.year.toString()+'-'+((++mon).toString())}>{Math.round(row.dec).toLocaleString()}</td>
				</tr>)
			})}
			</tbody>
		</Table>
		</div>
		);
		}
	}
}


export default AnnualCumulativeView;