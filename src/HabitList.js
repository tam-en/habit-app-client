import React, { Component } from 'react';
import Habit from './Habit';
import NewHabitForm from './NewHabitForm';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class HabitList extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: props.user,
      habits: [],
      currentHabit: {},
      showNew: false
    }
  }

  showNewHabitForm = () => {
    this.setState({showNew: true})
  }

  showHabitList = () => {
    this.setState({showNew: false})
  }

  render() {
    const habitList = this.props.habits.map((h, i) => {
      return (<Habit habit={h} key={i} user={this.props.user} changeCurrent={this.props.changeCurrent} />);
    });

    if(this.props.user){
      if(this.state.showNew === false){
        return (
          <div>
            <button onClick={this.showNewHabitForm} ><Link className="buttonLink" to="/NewHabitForm">Create New Habit</Link></button>
            <hr />
            {habitList}
          </div>
        );
      } else {
        return(<NewHabitForm user={this.state.user} onAdd={this.props.getHabits} showHabitList={this.showHabitList} />)
      }
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
