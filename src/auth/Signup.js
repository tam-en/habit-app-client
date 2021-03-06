import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from '../constants/server';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }

  handleNameChange = (e) => { this.setState({ name: e.target.value }); }

  handleEmailChange = (e) => { this.setState({ email: e.target.value }); }

  handlePasswordChange = (e) => { this.setState({ password: e.target.value }); }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('in submit function, state is:', this.state, SERVER_URL);
    // SEND DATA TO SERVER
    axios.post(`${SERVER_URL}/auth/signup`, this.state)
    .then(response => {
      console.log('SUCCESS', response);
      // assume we have a token that we should save to local storage
      localStorage.setItem('serverToken', response.data.token);
      // need to update the state of react somehow . . . from not logged in to logged in
      this.props.updateUser();
    })
    .catch(err => {
      console.log('ERROR when submitting signup form', err);
    })
  }

  render() {
    //console.log('updateUser:', this.props.updateUser)
    if(this.props.user){
      return (<Redirect to="/dashboard" />);
    }
    return(
      <div className="pageGrid">
        <div className="mainPageContent">
            <h2>Sign up!</h2>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input name="Name" placeholder="your name" value={this.state.name} onChange={this.handleNameChange} />
              </div>
              <div>
                <input name="Email" placeholder="your email" value={this.state.email} onChange={this.handleEmailChange} />
              </div>
              <div>
                <input name="Password" type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} />
              </div>
              <input type="submit" value="submit" className="button" />
            </form>
          </div>
        </div>
      );
  }
}

export default Signup;
