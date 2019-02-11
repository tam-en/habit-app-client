# Habits Tracker

This app is a work in progress, created by Quiwaan Little, Brad McKnight, and Tamis Nordling. It is housed in the following GitHub repositories:

client app: https://github.com/tam-en/habit-app-client
server app: https://github.com/tam-en/habit-app-server

The app is deloyed on Heroku at this address: https://habits-track.herokuapp.com/

This app is based on an authorization boilerplate app that was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). For more information on that, see the "Boilerplate.md" file in the same directory that houses this README.md.

## Overview of this app

Our Habits Tracker app, as its name implies, is for tracking habits to aid in the establishment of habits that the user wants to foster. It allows the user to create an account, define one or more "habits," enter a per diem goal, and a description. Afterward, the user can enter how well they did against their goal on specific days. In future releases of the app, we hope to add a graphing feature that will represent this data visually so users can better conceptualize their progress and stay motivated.

## Development process

This was, for all three of us, an opportunity to hone several important development technologies and skills. We wanted to improve our group-development skills (e.g., using shared GitHub repositories), our Node and React proficiency, and work on responsive CSS. 

### Chronology

**Days 1 and 2 (Saturday, Sunday):** We began over a weekend. Via Slack, we agreed to create a habit tracker. Separately we explored some examples of this type of app to see what we thought worked well and what didn't. 

**Day 3 (Monday):** Our weekend was extended due to a snow day, so we started more explicit planning remotely using Slack and a shared Google doc to think through data structures, visual motif ideas, routes, stretch goals. We started a list of reasonably discrete tasks that could be done parallel to one another.

Perhaps the hottest debate topic was how many MongoDB collections we needed. Two were a no-brainer: A user collection (name, email, password) and a habits collection (minimum of name, per-diem goal, description). But how to store the data on daily "completions" (date, how many times a task was completed on that date, notes). Should this be its own collection, with a reference to the relevant habit? Or should we store this data as an array of objects that was its own document in the habits collection? We settled on the latter. It seemed easier for future array-mapping purposes, and there was no downside to storing the daily data inside a particular habit (there would be no reason to use such data outside its habit context).

**Day 4 (Tuesday):** We were finally together in person, though not for an entire day (more weather interference as the first of several historic storms hit Seattle). Our priorities became achieving consensus on data structure and MVP features. We wanted to keep our MVP as modest as possible, while prioritizing our growing list of stretch goals (listed at the end of this document). Tamis had agreed to serve as gitmaster, and supplied the MERN auth boilerplate code for server/client apps (we all had similar boilerplates). Much whiteboarding of components and UI ensued.

We didn't do a lot of sprint planning, as our remaining time dictated a scheme for us: We hoped to have MVP by end of day Thursday, so the bulk of code logic and wireframing would need to be in place before Friday. Friday for cleanup and stretch goals. Weekend for CSS/UI and final touches.

**Day 5-6 (Wednesday, Thursday):** These two days were indeed when the bulk of the coding and inevitable troubleshooting happened. Productivity was again hampered by inclement weather that delayed program starts. By the end of Thursday, several of the critical features were working correctly.

**Day 7 (Friday):** Had to work separately because of inclement weather/road closures. Q and Brad continued to work on routes, components. Tamis switched to CSS and UI.

**Day 7-8 (Sat., Sun):** Based on teacher advice, we stopped trying to implement new features, but continued to work on some minor problems, UI/CSS, and this Readme.md.

**Day 9:** Yet another snow day gave us bonus time to fix errors and fine-tune. 

## Data structure

We considered storing daily data in its own collection, but settled on keeping it in an array of objects inside the Habits collection. In the end, our schema looked like this:

```
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  password:{
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25
  },
  email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
});
```

and . . .

```
const habitSchema = new mongoose.Schema({
	name:{
		type: String,
		min: 3,
		max:25, 
		required: true
	},
	timesPerDay:{
		type: Number,
		required: true,
		minlength: 2,
		maxlength: 25
	},
	days: [{
		date: Date,
		completions: Number,
		notes: String
	}],
	description: {
		type: String,
		min: 2,
		max: 200
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	} 
})
```

## MVP goals

We chipped away at our MVP goals as the weather chipped away at our core body temperatures and shared time together! By sometime on Wednesday our goals were as follows:

- Home page with login and signup
- User dashboard that displays the logged-in user's defined habits, with a button to add a new habit. 
- Defined habits were to be clickable to display details already logged on that habit and a form to input new per-diem data.
- Habit data (name, description, goal) were to be editable.
- Daily data addition/modification were to be implemented via PUT route to the Habits collection.
- Daily data entries (aka "complettions") and entire habits were to be deletable.

## Wireframing

The wireframing for the UI started as a sketch like this: ![wireframe-sketch](/Users/rushling/wdi-fundamentals/unit03/habit-app-client/src/images/wireframe-sketch.png)

The plan  was to design for mobile using CSS grid with four columns: the first and fourth would be flexible, and second column would be fixed-width and feature a train track (for habits tracker? get it?), and the third column a max-width of 210 pixels to that it would fit even on an iPhone 5/SE. After getting the mobile design to work right, we would add media queries to adjust the design for larger formats. Those would allow the third column to increase in size quite a lot, for items to populate the first column when it got big enough (some graphics, the app name). Regardless of viewport, the navigation bar would behave roughly the same, flush left aligning more or less with the edge of the tracks.

We picked Open Sans for an all-purpose typeface for its readability, range of weights, and condensed option, though we didn't end up using it. 

The train tracks suggested a healthful, cheery, bucolic scene, perhaps because one of us had, at one point, been overexposed to Thomas the Tank Engine cartoons. The color palette ended up a deep sky blue, forest greens, brown, and cloud white. For wide viewports, two trees appear in the first column; for narrow (e.g. phone) viewports, just a single tree appears in the 3rd/4th column, in a light color that doesn't obscure type above it.

## Challenges encountered

Some of the challenges we encounteres along the way included the following:

- Routing issues
- Indecision over what components to display on the Dashboard, which resulted in a significant coding refactor on Friday.
- Difficulty splitting up work that had to happen on the same files (there's only so many cooks you can have in the kitchen at one time). One thing we eventually did was let one of us split off and work on CSS as of Friday, as that had minimal impact on the main component files.
- Inclement weather seriously cut into group time and hampered communication. On the bright side, it forced us to spent a full day planning, which may have prevented a hasty start to coding.
- The CSS grid was suprisingly difficult to implement, possibly because there were so many nested divs in nested components. Feedback from the Chrome Inspector suggested that the grid itself wasn't getting passed from div to div, especially across components. In the end, we chanced upon a fix: When a div didn't seem to be "receiving" the grid from the parent element, we assigned it all four columsn of the grid *and* redefined the grid for that className. No idea if it should have worked, but it did.

## Stretch goals

- Use charts.js or a similar tool to graphically represent progress toward habit goals.
- Add a boolean field to the Habit schema, i.e., “goodHabit,” that is true for good habits, false for bad habits. We'd then need a function that calculates whether a daily goal has been met based onwhether goodHabit is true or false. If goodHabit = true and dailyCompletions >= dailyGoal, then success is true, else sucess is false. Else if goodHabit = false, and dailyCompletions <= dailyGoal, success is true, else success is false
- Add streaks feature to track how many days in a row a habit goal has been met or exceeded.
- Add a feature to set a deadline and a goal, and then track progress toward that goal rather than track whether daily goals have been met. Would require a different data structure and would a significant feature addition.

## Pie-in-the-sky goals

One thing that would make this really cool is to create a buddy system feature. Have a friend be in on your goal setting and striving so that you feel accountable and someone is cheering you on. 





