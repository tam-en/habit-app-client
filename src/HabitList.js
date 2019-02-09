import React, { Component } from 'react';
import Habit from './Habit';

class HabitList extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: props.user,
      habits: [],
      currentHabit: {}
    }
  }

  render() {
    const habitList = this.props.habits.map((h, i) => {
      return (<Habit habit={h} key={i} user={this.props.user} changeCurrent={this.props.changeCurrent} />);
    });

    if(this.props.user){
      return (
          <div>
            {habitList}
          </div>
        );
    }2
    return(
      <div>
        <p>This is a habit page. You must be logged in to see it.</p>
        <p>Would you like to <a href="/login">Log In</a> or <a href="/signup">Sign up</a>?</p>
      </div>
      );
  }
}

export default HabitList;
