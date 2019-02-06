import React, { Component } from 'react';
import HabitList from './HabitList';
import NewHabitForm from './NewHabitForm';

class Dashboard extends Component {
  render() {
    if(this.props.user){
      return (
          <div>
            <h2>{this.props.user.name}'s Habit Dashboard</h2>
            <HabitList user={this.props.user} habits={this.props.habits} />
            <NewHabitForm user={this.props.user} />
          </div>
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
