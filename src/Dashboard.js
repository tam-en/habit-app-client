import React, { Component } from 'react';
import HabitList from './HabitList';
import NewHabitForm from './NewHabitForm';
import SERVER_URL from './constants/server';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
class Dashboard extends Component { 
  constructor(props){
    super(props)
    this.state = {
      user: props.user,
      habits: []
    }
  }

  componentDidMount() {
    if(this.state.user){
      console.log("found user", this.props.user)
      this.getHabits()
    } else {
      console.log("no user yet")
    }
  }

  getHabits = () => {
     fetch(SERVER_URL+'/habits/'+this.props.user.id )
    .then(response=> {
      // fetch returns a fetch object, not JUST the data
      return response.json() // extract json from fetch object
    })
    .then(json=>{
      console.log(json)
      this.setState({habits: json})
    })
    .catch(err=>{
      console.log("Error fetching habits!", err)
    })   
  }

  render() {

    if(this.props.user){
      return (
        <Router>
          <div>
            <h2>{this.props.user.name}'s Habit Dashboard</h2>
            <HabitList user={this.props.user} habits={this.state.habits} />
            <Route path="/NewHabitForm"component={
              () => (<NewHabitForm user={this.state.user} />)
            } />
      <button><Link to= "/NewHabitForm">New Habit</Link></button>
      <button onClick={this.props.toggleForm}>Edit</button>
            {/* <NewHabitForm user={this.props.user} /> */}
          </div>
          </Router>

        );
    }
    return(
      <div>
        <p>This is a dashboard page. You must be logged in to see it.</p>
        <p>Would you like to <a href="/login">Log In</a> or <a href="/signup">Sign up</a>?</p>
      </div>
      );
  }
}

export default Dashboard;
