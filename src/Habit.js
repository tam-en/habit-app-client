import React, { Component } from 'react';


class Habit extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: props.user,
      habits: []
    }
  }

  render() {
    if(this.props.user){
      return (
          <div>
            <h2>This is a habit!</h2>
            <p>{this.props.habit.name}</p>
          </div>
        );
    }
    return(
      <div>
        <p>This is a habit page. You must be logged in to see it.</p>
        <p>Would you like to <a href="/login">Log In</a> or <a href="/signup">Sign up</a>?</p>
      </div>
      );
  }
}

export default Habit;