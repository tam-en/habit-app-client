import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import HabitDetail from './HabitDetail';


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
          <div>

            <h4>This is a habit!</h4>
            <p>{this.props.habit.name}</p>
            {/*<button onClick={this.deleteBounty}>Delete</button>*/}
            <Router>
              <Link>Details</Link>
              <Route path="" component={() => (<HabitDetail rerender={this.props.rerender} habit={this.props.habit} user={this.props.user}/>)}/>

            </Router>
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