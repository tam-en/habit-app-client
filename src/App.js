import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from './constants/server';
import './App.css';
import Footer from './layout/Footer';
import Home from './Home';
import Login from './auth/Login';
import Nav from './layout/Nav';
import Dashboard from './Dashboard';
import Signup from './auth/Signup';
import HabitList from './HabitList';
import NewHabitForm from './NewHabitForm';
import EditHabitForm from './EditHabitForm';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      form: 'new'
    }
  }

  componentDidMount = () => {
    // GET USER INFO
    this.getUser();
  }

  getUser = () => {
    // SEE IF THERE'S A TOKEN
    let token = localStorage.getItem('serverToken');
    // IF THERE IS, TRY TO GET USER INFO
    if(token){
      console.log('found token in local storage:', token);
      axios.post(`${SERVER_URL}/auth/current/user`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        console.log('Success!');
        this.setState({
          user: response.data.user
        })
      })
      .catch(err => {
        console.log('Error looking up user by token. Error=', err, err.response);
        this.setState({ user: null });
      })
    }
    else {
      console.log('no token in local storage');
      this.setState({ user: null });
    }
  }

  getHabits = () => {
     fetch(SERVER_URL)
    .then(response=> {
      // fetch returns a fetch object, not JUST the data
      return response.json() // extract json from fetch object
    })
    .then(json => {
      console.log(json)
      this.setState({ habits: json })
    })
    .catch(err=>{
      console.log("Error fetching habits!", err)
    })   
  };

  toggleForm = () => {
    const newForm = this.state.form === 'edit'?'new':'edit'
    this.setState({form: newForm})
  }

  render() {

    const form = this.state.form === 'new' ?
                    <NewHabitForm rerender={this.getHabits} /> : 
                    <EditHabitForm current={this.state.current}
                    rerender={this.getBounties}
                    changeCurrent={this.changeCurrent} 
                    toggleForm={this.toggleForm} />                
    return (
      <div className="App">
        <div className="pageGuts">
          <div className="mainTitle">
          <h1>HABITS TRACKER</h1>
          </div>
          <div className="trackSvg">
          </div>
          <Router>
            <div className="wholeGrid">
              <Nav user={this.state.user} updateUser={this.getUser} />
              <Route exact path="/" component={Home} />
              <Route path="/login" component={
                () => (<Login user={this.state.user} updateUser={this.getUser} />)
              } />
              <Route path="/signup" component={
                () => (<Signup user={this.state.user} updateUser={this.getUser} />)
              } />
              <Route path="/dashboard" component={
                () => (<Dashboard user={this.state.user} />)
              } />
            </div>
          </Router>
          </div>
      </div>
    );
  }
}

export default App;
