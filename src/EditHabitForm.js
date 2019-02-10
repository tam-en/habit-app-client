import React, { Component } from 'react';
import SERVER_URL from './constants/server';



class EditHabitForm extends Component {

  constructor(props){
		super(props)
		this.state = {
			name: "",
			timesPerDay: 0,
			description: "",
			days: [],
			user: props.user.id,
			habit: props.habit,
		}
  }



  
  storeInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

  editHabit = (e) => {
    // Fetch route to edit a habit
    console.log("THIS.STATE UPON FORM SUBMIT", this.state)
		e.preventDefault()
		// console.log(this.state) 
		fetch(SERVER_URL+'/habits/'+this.props.user.id, {
			method: 'PUT',
			body: JSON.stringify(this.state), // data to send to server
			headers: {
				'Content-Type': 'application/json' // let the server know what's coming
			}
		})
		.then(response => response.text())
    .then(json=>{
		console.log("THIS:", this.props)
      console.log(json)
      this.setState({habits: json})
    })
    .catch(err=>{
      console.log("Error fetching habits!", err)
    })   
  }


  deleteHabit = () => {
	  // The will run on the delete button click and fetch the delete habit route
	  fetch(SERVER_URL+'/habits/'+this.props.user.id, {
		method: 'DELETE'
	})
	.then(response => {
		let responseJSON = response.status===204 ? {} : response.json()
		return responseJSON
	})
	.then(json =>{
		this.props.rerender()
	})
	.catch(err=>{
		console.log("Error Deleteing bounty", err)
	})
}

  	
  

  render() {
	  <habit />
    return(
			<div>
				<form onSubmit={this.editHabit} >
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
				<input type="submit" value="Edit New Habit" />
				</form>
			</div>
		)
    }
}

export default EditHabitForm;