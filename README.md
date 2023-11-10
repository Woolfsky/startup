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
+ Task organization page
+ Work session (Pomodoro) page with session timer to work on those tasks
+ Community page to post helpful tips and share accomplishments/streaks
+ Notifications when an item has been on a to-do list for a long time
+ Buttons with various functionalities

### Technologies
I will use the required technologies in the following ways:
+ **HTML** - structure the pages and provide a menu to navigate throughout the app, also create buttons
+ **CSS** - make it look as aesthetically perfect as a blueberry muffin:)
+ **JavaScript** - add functionality to the buttons to add new cards and lists, along with buttons to stop, start, and restart timer
+ **Authentication** - sign up and login to get a space for your notes, displays name after logging in
+ **DB** - store all of the notes and lists, along with the forum for posting helpful tips
+ **WebSocket** - either announcing when someone finishes a Pomodoro session or just announcing the tips comments (which you can disable, and which auto-disable during a focus session)
+ **React** - application ported to use the React web framework

## HTML Deliverable
For this deliverable, I built out the structure of my website using HTML:
+ **HTML pages** — Three pages were built out, each a key element of my server (*Tasks* displays all current to-do list styled task cards, *Sessions* is a page in which the user can start focus sessions using the Pomodoro Method, *Community* is a page where helpful tips can be shared by other users)
+ **Head icon** — I used [favicon.io](https://favicon.io/) to design a logo for *focus* and linked it in the head element
+ **Menu links** — Each page has a menu in the header; the menu enables the user to navigate throughout the services
+ **Textual content** — *Community* page begins with some text content about general study tips
+ **Placeholder** — The *Sessions* page will have a working timer for sessions (brought in with a 3rd party service call), but a picture is there for now
+ **Images** — *Community* page has a landscape picture at the top
+ **Login** — Input box and a submit button (button functionality will come later)
+ **DB data** — Task cards will display saved data for each user (I hard-coded the values for now)
+ **WebSocket** — The *Community* page will display live comments and tips from other users (I hard-coded the values for now)

## CSS Deliverable
For this deliverable, I styled the application to the desired aesthetics:
+ **Header, footer, and main content body** - I structured everything to look aesthetically consistent and cleaner
+ **Navigation elements** - My nav bar has on-theme aesthetics and is right aligned to look better
+ **Responsive to window resizing** - My pages all look great with different browser sizes and proportions
+ **Application elements** - Used good contrast and white space to make it easy to use
+ **Application text content** - Text content wraps when the window gets too tight and all the text is a consistent font
+ **Application images** - Images are centered even when page changes

## JavaScript Deliverable
For this deliverable, I added functionality to my server:
+ **Login** - When a user presses login, a login prompt appears; when they enter info and press continue, it adds their info to the localStorage and displays the user's name (indicating they've logged in)
+ **Database data** - I used JS to store user information (i.e., all of their task cards) and then to update them in localStorage when they make changes (imitating a database)
+ **WebSocket data** - I made a community forum chat for posting useful tips. For now, the chat is stored in localStorage, but future WebSocket integration should be simple
+ **Interaction logic** - Users can edit tasks on the *Tasks* page and then open up those tasks in the *Sessions* page and see the changes (using localStorage)

## Service Deliverable
For this deliverable, I added the following functionality to my server:
+ HTTP service using Node.js and Express — I configured my server to use Node.js and Express!
+ Frontend served up using express static middleware — Done! My frontend is served up using Express
+ Frontend calls third-party service endpoints — I added an "Advice of the Day!" section to the *Community* page which makes a request to a third-party advice generator
+ Backend provides service endpoints — My backend provides endpoints that my frontend calls
+ Frontend calls those service endpoints — My frontend calls those backend endpoints
