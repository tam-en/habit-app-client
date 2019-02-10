import React, { Component } from 'react';

class Home extends Component {
  render() {
    return(
    	<div className="pageGrid">
	    	<div className="mainPageContent">
	        	<p>Welcome to your daily Habits Tracker app! Use it to record your progress creating new habits&mdash;it will help you stay on track!<br/><br/> 

	        	New habits can take a good while to establish&mdash;maybe a couple of weeks, perhaps a few months. Every experience is a little different.<br/><br/>

	        	Want to read more on the topic? Here&rsquo;s one good article from author Gretchen Rubin, published in <a target="_blank" href="https://www.psychologytoday.com/us/blog/the-happiness-project/200910/stop-expecting-change-your-habit-in-21-days">Psychology Today</a>.<br/><br/>

	        	This app was created by Quiwaan Little, Brad McKnight, and Tamis Nordling, &copy; 2019.</p>
	    	</div>
    	</div>
      );
  }
}

export default Home;
