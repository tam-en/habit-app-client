import React, { Component } from 'react';
import Habit from './Habit';

class HabitList extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: props.user,
      habits: []
    }
  }


  render() {
    const habitList = this.props.habits.map((h, i) => {
      return (<Habit habit={h} key={i} user={this.props.user} />);
    });

    if(this.props.user){
      return (
          <div>
            <p>Use map iterator to create a div of each of the user's habits. Also pass down props to the Habit Component</p>
            {habitList}
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

export default HabitList;
