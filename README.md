# focus
## Description deliverable
### Project notes
[Here](/notes.md) is a link to my notes from this project and course

### Elevator pitch
Accomplishing all of your tasks this week starts with effective organization, and I don't mean just listing all your to-do's in a note on your phone and hoping to finish them all. *focus* is an app that not only helps you plan out your work but also helps you break down tasks into manageable elements and then prioritize and weight each of them. *focus* even goes a step further by integrating the *Pomodoro Method* of using short, undistracted working sessions to power through your tasks. *focus* is ideal for people who get distracted easily while working, who have a hard time breaking down and spacing out big tasks, or who simply want to accelerate their productivity. 

### Design
<img width="500" alt="Screenshot 2023-09-23 at 2 22 09 PM" src="https://github.com/Woolfsky/startup/assets/117865470/68b3f015-257c-40c2-9fd1-e6cf66338fc7">
<img width="500" alt="Screenshot 2023-09-23 at 2 21 56 PM" src="https://github.com/Woolfsky/startup/assets/117865470/8090079b-7884-45c0-b0c1-21a577f666a1">
<img width="500" alt="Screenshot 2023-09-23 at 2 21 40 PM" src="https://github.com/Woolfsky/startup/assets/117865470/7667d10e-b836-4e98-b78a-a7de083654e6">

### Key features
+ Secure login through HTTPS
+ Ability to add, organize, prioritize, and assign weights to tasks (i.e. how many Pomodoro sessions)
+ Work session (Pomodoro) page with session timer
+ Current habits and streaks page
+ Community page to post helpful tips and share accomplishments/streaks
+ Notifications when an item has been on a to-do list for a long time
+ Buttons with various functionalities

### Technologies
I will use the required technologies in the following way:<br>
+ **HTML** - structure the pages and provide a menu to navigate throughout the app, also create buttons
+ **CSS** - make it look as aesthetically perfect as a blueberry muffin:)
+ **JavaScript** - add functionality to the buttons to add new cards and lists, along with buttons to stop, start, and restart timer
+ **Authentication** - sign up and login to get a space for your notes, displays name after logging in
+ **DB** - store all of the notes and lists, along with the forum for posting helpful tips
+ **WebSocket** - either announcing when someone finishes a Pomodoro session or just announcing the tips comments (which you can disable, and which auto-disable during a focus session)
+ **React** - application ported to use the React web framework

### HTML
For this deliverable, I built out the structure of my website using HTML
+ **HTML pages** — Four pages were built out, each a key element of my server (*Tasks* displays all current to-do list styled task cards, *Habits* displays the current habits the user is tracking along with their streaks, *Sessions* is a page in which the user can start focus sessions using the Pomodoro Method, *Community* is a page where helpful tips can be shared by other users)
+ **Head icon** — I used [favicon.io](https://favicon.io/) to design a logo for *focus* and linked it in the head element
+ **Menu links** — Each page has a menu in the header; the menu enables the user to navigate throughout the services
+ **Textual content** —
+ **Placeholder** — some kind of 3rd party service call?
+ **Images** —
+ **Login** — Input box and a submit button (button functionality will come later)
+ **DB data** — Task and habit cards will display saved data for each user (I hard-coded the values for now)
+ **WebSocket** — The *Community* page will display live comments and tips from other users (I hard-coded the values for now)
