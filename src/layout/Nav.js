import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

class Nav extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    // REMOVE LS TOKEN; UPDATE PARENT STATE
    localStorage.removeItem('serverToken');
    this.props.updateUser();
  }

  render() {
    let links = '';
    if(this.props.user){
      links = (
          <span>
            <Link to="/dashboard">Dashboard</Link>
            <a onClick={this.handleLogout}>Logout</a>
          </span>
        );
    }
    else {
      links = (
          <span>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </span>
        );
    }
    return(
        <div className="anotherWholeGrid">
        <div className="navBackground"></div>
            <nav className="nav">
              <Link to="/">Home</Link>
              {links}
            </nav>
          </div>
      );
  }
}

export default Nav;
