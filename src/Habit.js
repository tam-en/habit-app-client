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
            <button onClick={()=>{this.props.changeCurrent(this.props.habit)}}>Details</button>
            {/*<Router>
              <div>
                <Link to="/habit-detail">Details</Link>
                <Route path="/habit-detail" component={() => (<HabitDetail rerender={this.props.rerender} habit={this.props.habit} user={this.props.user} />)}/>
              </div>
            </Router>*/}
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
