import React, { Component } from 'react';
import SERVER_URL from './constants/server';

// any time componentDidMount & dateChange happens we need to fetch data (again) . . . e.g., the fetching should
// happen in a function that can be called when needed


class NewHabitForm extends Component {

	constructor(props){
		super(props)
		this.state = {
			name: "",
			timesPerDay: 0,
			description: "",
			days: [],
			user: props.user.id
		}
	}

	storeInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	newHabit = (e) => {
		console.log("THIS.STATE UPON FORM SUBMIT", this.state)
		e.preventDefault()
		// console.log(this.state)
		fetch(SERVER_URL+'/habits/'+this.props.user.id, {
			method: 'POST',
			body: JSON.stringify(this.state), // data to send to server
			headers: {
				'Content-Type': 'application/json' // let the server know what's coming
			}
		})
		.then(response => response.json())
		.then(json => {
			// console.log(json)
			console.log("THIS:", this.props)
			this.props.rerender()
		})
		.catch(err => {
			console.log('Error posting data!', err)
		})
	}
	
	render(){
		return(
			<div>
				<form onSubmit={this.newHabit} >
				<div>
					<label>Name</label>
					<input type="text" placeholder="What's the name of your new daily habit?" name="name" onChange={this.storeInput} value={this.state.name} />
				</div>
				<div>
					<label>Times Per Day Goal</label>
					<input name="timesPerDay" type="number" min="1" max="100" step="1" placeholder="How many times per day would be ideal?" 
					onChange={this.storeInput} value={this.state.timesPerDay} />
				</div>
				<div>
					<label>Description</label>
					<input name="description" type="text" onChange={this.storeInput} value={this.state.description} />
				</div>
				<input type="submit" value="Add New Habit" />
				</form>
			</div>
		)
	}
};

export default NewHabitForm;
