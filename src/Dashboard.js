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
      currentHabit: {},
      newHabit: false
    }
  }



  componentDidMount() {
    if(this.state.user){
      console.log("found user", this.props.user)
      this.getHabits()
      this.setState({newHabit: false})
    } else {
      console.log("no user yet")
    }
  }

  showNewHabitForm = () => {
    this.setState({newHabit: true})
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
    const details = this.state.currentHabit._id ? <HabitDetail changeCurrent={this.changeCurrent} currentHabit={this.state.currentHabit} user={this.props.user} habit={this.state.currentHabit} /> : <HabitList user={this.props.user} habits={this.state.habits} changeCurrent={this.changeCurrent} />
    const headerText = this.state.currentHabit._id ? ": "+ this.state.currentHabit.name : "s:"
<<<<<<< HEAD
    if(this.props.user){
      return (
        <Router>
<<<<<<< HEAD
          <div>
            <h2>{this.props.user.name}'s Habit Dashboard</h2>
            {details}
            <Route path="/NewHabitForm"component={
              () => (<NewHabitForm user={this.state.user} onAdd={this.getHabits} />)
            } />
      <button><Link to= "/NewHabitForm">New Habit</Link></button>
            {/* <NewHabitForm user={this.props.user} /> */}
=======
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
>>>>>>> daab1fc1c22bae29980000a4589feb6f1e741383
          </div>
          </Router>
        );
    }
    return(
      <div>
        <p>This is a dashboard page. You must be logged in to see it.</p>
        <p>Would you like to <a href="/login">Log In</a> or <a href="/signup">Sign up</a>?</p>
      </div>
=======
    if(this.state.newHabit === false){
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
                <button onClick={this.showNewHabitForm} ><Link className="buttonLink" to="/NewHabitForm">Create New Habit</Link></button><br />
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
>>>>>>> 425d6530e54f70de4928e6dc7a1c993230b020ef
      );
      } else {
        return(<NewHabitForm user={this.props.user} />) 
    }
  }
}
export default Dashboard;