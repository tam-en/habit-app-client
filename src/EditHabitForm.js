import React, { Component } from 'react';


class EditHabitForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: props.user,
      habits: []
    }
  }

  editHabit = () => {
  	// Fetch route to edit a habit

  }

  deleteHabit = () => {
  	// The will run on the delete button click and fetch the delete habit route
  	
  }

  render() {
    if(this.props.user){
      return (
          <div>
            <h2>Edit your habit here!</h2>
            <h4>{this.props.habit.name}</h4>
            <p>There will be a form here to edit all fields of a Habit except completions</p>
            <button>This should be a delete button</button>
          </div>
        );
    }
    return(
      <div>
        <p>This the edit habit page. You must be logged in to see it.</p>
        <p>Would you like to <a href="/login">Log In</a> or <a href="/signup">Sign up</a>?</p>
      </div>
      );
  }
}

export default EditHabitForm;