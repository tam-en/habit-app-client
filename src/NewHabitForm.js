import React, { Component } from 'react';
import SERVER_URL from './constants/server';



class NewHabitForm extends Component {

	newHabit = (e) => {
		e.preventDefault()
		// console.log(this.state)
		fetch(SERVER_URL, {
			method: 'POST',
			body: JSON.stringify(this.state ), // data to send to server
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
					<input type="text" placeholder="What's the name of your new daily habit?" />
				</div>
				<div>
					<label>Times Per Day Goal</label>
					<input type="number" min="1" max="100" step="1" placeholder="How many times a per day would be ideal?" />
				</div>
				<div>
					<label>Description</label>
					<input type="text" />
				</div>
				<input type="submit" value="Add New Habit" />
				</form>
			</div>
		)
	}
};

export default NewHabitForm;
