import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class Habit extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: props.user,
      habit: props.habit
    }
  }

  render() {
    if(this.props.user){
      return (
          <div className="habitContainer">
            <button onClick={()=>{this.props.changeCurrent(this.props.habit)}}>{this.props.habit.name}</button>
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
