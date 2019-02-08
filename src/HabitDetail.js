import React, { Component } from 'react';
import SERVER_URL from './constants/server';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import EditHabitForm from './EditHabitForm';
import Dashboard from './Dashboard';

class HabitDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      habit: props.habit,
      date: new Date(),
      completions: 0,
      notes: ""
    }
  }

  // Push the new day into the DAYS array in the habit model
  newDay = (e) => {
   console.log("THIS.STATE UPON FORM SUBMIT", this.state)
    e.preventDefault()

  let dayData = {
    date: this.state.date,
    completions: this.state.completions,
    notes: this.state.notes
  }

  let bodyToSend = {
    habit: this.props.habit,
    dayData: dayData
  }
  fetch(SERVER_URL+'/habits/completions/'+this.props.habit._id, {
      method: 'PUT',
      body: JSON.stringify(bodyToSend), // data to send to server
      headers: {
        'Content-Type': 'application/json' // let the server know what's coming
      }
    })
    .then(response => response.json())
    .then(updatedHabit => {
      // console.log(json)
      console.log("ANSWER FROM SERVER:", updatedHabit);
      // this.props.rerender()
    })
    .catch(err => {
      console.log('Error posting completion data!', err)
    })
  }

  storeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {

    let today = new Date();
    console.log("THIS.STATE UPON COMPLETIONS:", this.state)
    if(this.props.user){
      return(
        <div>
          <form onSubmit={this.newDay} >
          <div>
            <label>Date</label>
            <input type="date" name="date" onChange={this.storeInput} value={this.state.date} />
          </div>
          <div>
            <label>Times Per Day Completed</label>
            <input name="completions" type="number" min="0" max="100" step="1"
            onChange={this.storeInput} value={this.state.completions} />
          </div>
          <div>
            <label>Notes</label>
            <input name="notes" type="text" onChange={this.storeInput} value={this.state.notes} />
          </div>
          <input type="submit" value="Add New Completions!" />
          </form>

          <Router>
            <div>
              <Link to="/edit-habit">Edit This Habit</Link>
              <Route path="/edit-habit" component={() => (<EditHabitForm habit={this.props.habit} user={this.props.user} />)} />
              <Link to="/delete-habit">Back to Dashboard</Link>
              <Route path="/dashboard" component={() => (<Dashboard user={this.props.user} />)} />
            </div>
          </Router>
      </div>
      );
    }
    return(
      <div>
        <p>This is a habit detail page. You must be logged in to see it.</p>
        <p>Would you like to <a href="/login">Log In</a> or <a href="/signup">Sign up</a>?</p>
      </div>
      );
  }
}


export default HabitDetail
