import React, { Component } from 'react';

class Home extends Component {
  render() {
    return(
    	<div className="pageGrid">
	    	<div className="mainPageContent">
	        	<p>Welcome to your daily habit tracker app! Use Habits Tracker to record your progress and stay on track while establishing positive habits. New habits can take a good while to fix into your routine&mdash;maybe a couple of weeks, perhaps a few months. Every experience is a little different.<br/><br/>

	        	Want to read more on the topic? Here&rsquo;s one good article on the topic from author Gretchen Rubin, publishing in <a href="https://www.psychologytoday.com/us/blog/the-happiness-project/200910/stop-expecting-change-your-habit-in-21-days">Psychology Today</a>.<br/><br/>

	        	This app was created by Quiwaan Little, Brad McKnight, and Tamis Nordling, &copy; 2019.</p>
	    	</div>
    	</div>
      );
  }
}

export default Home;
