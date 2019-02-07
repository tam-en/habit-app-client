
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

  // Push the new day into the DAYS array in the habit model
  newDay = (e) => {
   console.log("THIS.STATE UPON FORM SUBMIT", this.state)
    e.preventDefault()
    // console.log(this.state)
    fetch(SERVER_URL+'/habits/completions/'+this.props.user.id, {
      method: 'PUT',
      body: JSON.stringify(this.state), // data to send to server
      headers: {
        'Content-Type': 'application/json' // let the server know what's coming
      }
    })
    .then(response => response.json())
    .then(json => {
      // console.log(json)
      console.log("THIS:", this.props)
      this.props.rerender()
    })
    .catch(err => {
      console.log('Error posting completion data!', err)
    })
  }

  storeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
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

export default HabitDetail



  

