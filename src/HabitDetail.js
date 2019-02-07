
// THIS IS A VERY PRELIMINARY COMPONENT/FORM. CAN'T REALLY MAKE MUCH PROGRESS UNTIL A HABIT PROP IS GETTING PASSED TO IT. 
// NO IDEA HOW CLOSE ANY OF THE CODE IS TO FUNCTIONAL.


import React, { Component } from 'react';

class HabitDetail extends Component {
  constructor(props){
    super(props)
    this.state = { 
      date: props.date,
      completions: props.completions,
      notes: props.notes
    }
  }

  newDay = (e) => {
    e.preventDefault()
    // console.log(this.state)

    // REALLY CANNOT FIDDLE WITH THIS JAVASCRIPT UNTIL THIS FORM IS GETTING A HABIT PROP/DATA TO WORK WITH
  }
  render() {
    let today = new Date();
    if(this.props.user){
      return(
        <div>
          <form onSubmit={this.newDay} >
          <div>
            <label>Date</label>
            <input type="text" placeholder="What day are you recording?" name="date" onChange={this.storeInput} value={this.state.date} default={today} />
          </div>
          <div>
            <label>Times Per Day Completed</label>
            <input name="completions" type="number" min="1" max="100" step="1" placeholder="How many times per day would be ideal?" 
            onChange={this.storeInput} value={this.state.completions} />
          </div>
          <div>
            <label>Notes</label>
            <input name="notes" type="text" onChange={this.storeInput} value={this.state.notes} />
          </div>
          <input type="submit" value="Add New Day" />
          </form>
      </div>
      );
    }
    return(
      <div>
        <p>This is a habit detail page. You must be logged in to see it.</p>
        <p>Would you like to <a href="/login">Log In</a> or <a href="/signup">Sign up</a>?</p>
      </div>
      );
  }
}
export default HabitDetail;
