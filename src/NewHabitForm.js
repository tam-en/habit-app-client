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
			// onAdd is getHabits from the parent componenets
			this.props.onAdd();
			// function to go back to HabitList
			this.props.showHabitList();
		})
		.catch(err => {
			console.log('Error posting data!', err)
		})
	}
	
	render(){
		return(
			<div>
	            <h2>Create a new habit</h2>
				<form onSubmit={this.newHabit} >
					<div>
						<label>New habit name: </label>
						<input type="text" placeholder="Name of daily habit" name="name" onChange={this.storeInput} value={this.state.name} />
					</div>
					<div>
						<label>Times per day goal: </label>
						<input name="timesPerDay" type="number" min="1" max="100" step="1" placeholder="Times per day goal" 
						onChange={this.storeInput} value={this.state.timesPerDay} />
					</div>
					<div>
						<label>Description: </label>
						<textarea name="description" type="text" placeholder="description" className="textField" onChange={this.storeInput} value={this.state.description} />
					</div>
					<input type="submit" value="Submit" />
				</form>				
			</div>
		)
	}
};

export default NewHabitForm;
