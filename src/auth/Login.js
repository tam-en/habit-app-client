import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from '../constants/server';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailChange = (e) => { this.setState({ email: e.target.value }); }

  handlePasswordChange = (e) => { this.setState({ password: e.target.value }); }

  handleSubmit = (e) => {
    e.preventDefault();
    // SEND DATA TO SERVER
    console.log('About to log in', this.state);
    axios.post(`${SERVER_URL}/auth/login`, this.state)
    .then(response => {
      console.log('SUCCESS', response);
      // assume we have a token that we should save to local storage
      localStorage.setItem('serverToken', response.data.token);
      // need to update the state of react somehow . . . from not logged in to logged in
      this.props.updateUser();
    })
    .catch(err => {
      console.log('TODO: make error page for user', err.response.data);
    })
  }

  render() {
    if(this.props.user){
      return (<Redirect to="/dashboard" />);
    }
    return(
        <div>
          <h2>Login as an existing user</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input name="Email" placeholder="What is your email?" value={this.state.email} onChange={this.handleEmailChange} />
            </div>
            <div>
              <input name="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
            </div>
            <input type="submit" value="Log Me In!" className="button" />
          </form>
        </div>
      );
  }
}

export default Login;
