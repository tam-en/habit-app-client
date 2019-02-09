import React, { Component } from 'react';
import HabitList from './HabitList';
import NewHabitForm from './NewHabitForm';
import SERVER_URL from './constants/server';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import HabitDetail from './HabitDetail';

class Dashboard extends Component { 
  constructor(props){
    super(props)
    this.state = {
      user: props.user,
      habits: [],
      currentHabit: {}
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

  changeCurrent = (habit) => {
    this.setState({ currentHabit: habit })
  }

  render() {
    const details = this.state.currentHabit._id ? <HabitDetail changeCurrent={this.changeCurrent} currentHabit={this.state.currentHabit} user={this.props.user} /> : <HabitList user={this.props.user} habits={this.state.habits} changeCurrent={this.changeCurrent} />
    const headerText = this.state.currentHabit._id ? ": "+ this.state.currentHabit.name : "s:"
    if(this.props.user){
      return (
        <Router>
          <div className="pageGrid">
            <div className="mainPageContent">
              <h2>{this.props.user.name}&rsquo;s habit{headerText}</h2>
              {details}
              <hr />
              <Route path="/NewHabitForm"component={
                () => (<NewHabitForm user={this.state.user} onAdd={this.getHabits} />)
              } />
        <button><Link className="buttonLink" to= "/NewHabitForm">Create New Habit</Link></button><br />
        <button className="somethingBuggy" onClick={this.props.toggleForm}>Edit </button>
              {/* <NewHabitForm user={this.props.user} /> */}
            </div>
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
