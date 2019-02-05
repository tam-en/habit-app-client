import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    if(this.props.user){
      return (
          <div>
            <h2>{this.props.user.name}'s Habit Dashboard</h2>
            <h4>Render the HabitList Component here</h4>
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
