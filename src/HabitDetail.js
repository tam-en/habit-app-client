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
      notes: "",
      currentHabit: {}
    }
  }

  componentDidMount = () => {
    this.setState({ currentHabit: this.props.habit })
  }

  // Push the new day into the DAYS array in the habit model
  newDay = (e) => {
    console.log("THIS.STATE UPON FORM SUBMIT", this.state)
    e.preventDefault()

    let bodyToSend = {
      dayData: {
      date: this.state.date,
      completions: this.state.completions,
      notes: this.state.notes
    }
  }
  fetch(SERVER_URL+'/habits/completions/'+this.props.currentHabit._id, {
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
      this.props.changeCurrent({})
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
{/*        <h3>{this.props.currentHabit.name}</h3>
*/}        <h4>Enter details on how many times you did &ldquo;<strong>{this.props.currentHabit.name}</strong>&rdquo; on a particular day:</h4>
          <form onSubmit={this.newDay} >
          <div>
            <span><strong>Date: </strong></span>
            <input type="date" name="date" onChange={this.storeInput} value={this.state.date} />
   {/*       </div>
          <div>*/}
            <span><strong>  Times completed: </strong></span>
            <input name="completions" type="number" min="0" max="100" step="1"
            onChange={this.storeInput} value={this.state.completions} />
          </div>
          <div>
            <textarea name="notes" type="text" placeholder="notes" onChange={this.storeInput} value={this.state.notes} />
          </div>
          <input type="submit" value="submit" />
          </form>
          <hr />
          <button className="button" onClick={()=>{this.props.changeCurrent({})}}>go back to list of habits</button>
          <Router>
            <div>
              <Link className="somethingBuggy" to="/edit-habit">Edit This Habit</Link>
              <Route path="/edit-habit" component={() => (<EditHabitForm habit={this.props.habit} user={this.props.user} />)} />
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
