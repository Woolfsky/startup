## startup notes
### GitHub tutorial
`git clone <repo url>`  <- clones a repository locally<br>
`git add mytest.txt`  <- stages the edits you made in that file<br>
`git commit -am "my description"`  <- commits changes<br>
`git push`  <- pushed commits to the repo<br>
`git pull`  <- pulls up-to-date version of the repo<br>
`git fetch` then `git status`  <- lets you view changes without automatically updating (as a pull does)

### Server creation
I can remotely access my server using my terminal with the following command (after moving to the correct directory):<br>
`ssh -i production.pem ubuntu@44.205.237.113`

### Deploying to prod
To deploy changes to Simon (or startup):
1. ensure the deploy script is correct
2. ensure my current IP address is in the approved security group
3. clone the Simon repository into the startup directory (i.e. calling ls in the startup directory should show `simon-css` or whatever the repository was)
4. navigate into that new Simon repository
5. run `./deployFiles.sh -k ../../production.pem -h skylerwoolf.click -s simon`

### Domain names
Domain names are broken up into a subdomain, followed by a root domain. The root domain is made up of a secondary domain followed by a top domain:<br>
`[subdomain.]*secondary.top`  ->  my.byu.edu ("my" is the subdomain, "byu.edu" is the root domain, "byu" is the secondary domain, and "edu" is the top domain)<br>
<br>
A DNS server is a domain name system. This system maps a domain name (like byu.edu) to an IP address (128.187.16.184).<br> <br>

In DNS (Domain Name System), an A record (Address record) is used to map a domain name (e.g., example.com) to an IPv4 IP address (e.g., 192.0.2.1). A records are used to translate human-readable domain names into IP addresses. Note, an A record cannot directly point to another A record.

### Caddy/HTTPS/TLS/Web Certificates
Caddy handles web certificates (necessary for HTTPS)<br>
Caddy acts as a gateway for Simon and startup requests (routes port 443 user to the correct place)<br>
<br>
HTTPS (Secure Hypertext Transport Protocol) means a negotiation has taken place to encrypt the data (through TPS protocol) before transferring anything<br>
You can watch the negotiation take place using the `curl` command with the `-v` (verbose) flag:<br>`curl -v -s https://byu.edu > /dev/null`
<br>
<br>
Important ports to know:
+ Port 443: HTTPS (SSL/TLS-encrypted web traffic)
+ Port 80: HTTP (unencrypted web traffic)
+ Port 22: SSH (secure remote access)



### HTML
Start each doc with `<!DOCTYPE html>` to tell the browser the doc type<br>
Your main html file (wherever you want the user to initially land) should be titled `index.html`<br>
<br>
Hyperlinks are represented with an `a` tag with the link to the other page in the `href` attribute:<br>
`<a href="https://byu.edu">Go to the Y</a>`<br>
<br>

The following code is how you would display an image with a hyperlink:


```html
<a href="https://www.example.com">
  <img src="image.jpg" alt="Description of the image">
</a>
```


Comments: `<!-- commented text -->`<br>
<br>
When rendering and working with HTML, adding a  border rule can make formatting easier:<br>
`* {font-family: Arial; border: medium dashed #e3d5c2; padding: 0.25em; margin: 0.25em;}`<br>
<br>
Inputs are a way for the user to interact with the page. You specify the `type` of input. Here is an example:<br>
`<label for="checkbox1">Check me</label> <input type="checkbox" name="varCheckbox" value="checkbox1" checked />`<br><br>
Most inputs share these attributes:
  - name = name of the object
  - disabled = whether it's available to the user
  - value = the initial value of the input
  - required = signifies if it's required to be valid
The HTML elements that represent media include `img`, `audio`, `video`, `svg`, and `canvas`. <br>
Media elements need to clarify the path (either full or relative) to the item. A full path is a link (`https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg`) and a relative path is from your current directory (`images/photo.jpg`).<br>
<br>
Images are created this way (but with brackets around them):<br>
img alt='mountain landscape' src='https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg' alt='pic of mountains'<br>
<br>
The internal media elements `svg` and `canvas` allow you to actually create images directly within your HTML.

### CSS
CSS (Cascading Style Sheets) works using rules. A `rule` is comprised of a `selector` that selects the elements to apply the rule to, and one or more `declarations` that represent the `property` to style with the given property `value`. For example:<br>
<br>
```
p {
  font-family: sans-serif;
  font-size: 2em;
  color: navy;
  text-shadow: 3px 3px 1px #cccccc;
}
```

There are three ways to associate a CSS rule with your HTML:
Within a single element using the `style` tag (highest precedence), as a `<style>` element in the head of the HTML, or by hyperlinking the external file (lowest precedence): `<style link rel='stylesheet' href='somehref.something'></style>`

<br>
<br>

Child elements inherit the rules of their parent elements all the way up. Rules can be overridden by the child elements if desired.<br>
<br>
The box model is how CSS holds everything. From smallest to largest is content (text/images) > padding (inherits background color) > border (color/thickness/line stype) > margin (only represents whitespace)<br>

Note, that padding controls the spacing within and element (between the content and its border) while margin controls the spacing between elements.<br>

<br>

**CSS Selectors** are used to cascade the style down throughout the document:
<br>
The `body` selector is used to apply something to the entire document. 
<br>
The astrisk selector (`*`) also works for everything, but `body` is more specific.
<br>
Headings like `h1` can be used as well.
<br>
We can use a `descendant combinator` that is defined with a space-delimited list of values where each item in the list is a descendant of the previous item (e.g., `section h2` is a selector that applys to all `h2` elements that are a *child* of a `section`.
<br>
`.summary` is a selector that applies to the class 'summary'
<br>
`p.summary` applies to all paragraphs with the class 'summary'
<br>
`#physics` applies to the ID 'physics'
<br>
Attribute selectors allow you to select elements based upon their attributes: `p[class='summary']` applies to paragraphs with the summary class.
<br>
`section:hover` assigns a rule to wherever your mouse is hovering
<br>


<br>

There are many **units** that can be used in CSS rules. Here is a list of commonly used units:

| Unit | Description                                                      |
| ---- | ---------------------------------------------------------------- |
| px   | The number of pixels                                             |
| pt   | The number of points (1/72 of an inch)                           |
| in   | The number of inches                                             |
| cm   | The number of centimeters                                        |
| %    | A percentage of the parent element                               |
| em   | A multiplier of the width of the letter `m` in the parent's font |
| rem  | A multiplier of the width of the letter `m` in the root's font   |
| ex   | A multiplier of the height of the element's font                 |
| vw   | A percentage of the viewport's width                             |
| vh   | A percentage of the viewport's height                            |
| vmin | A percentage of the viewport's smaller dimension                 |
| vmax | A percentage of the viewport's larger dimension                  |

**Color** values can be described from keywords (`red`), RGB hex codes (`#00FFAA22`), RGB functions (`rgb(128, 255, 128, 0.5)`), and HSL functions (`hsl(180, 30%, 90%, 0.5)`).
<br>
The following code would make all the div elements have a red background:<br>


```js
div {
  background-color: red;
}
```


<br>

**Fonts** can be changed in a CSS rule through the `font-family` property. The four major font families include `Serif`, `sans-serif`, `fixed`, and `symbol`. `fixed` means all letters are the same size, and `symbol` represents things like emojis. <br>
<br>
Creating a `@font-face` rule enables you to import a font from the internet:

```css
@font-face {
  font-family: 'Quicksand';
  src: url('https://cs260.click/fonts/quicksand.woff2');
}

p {
  font-family: Quicksand;
}
```


If you do not want to host font files on your server, then you can load them from a font provider. Google provides a large selection of [open source fonts](https://fonts.google.com/) that you can use for free. You can import them like this:

```css
@import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');

p {
  font-family: 'Rubik Microbe';
}
```

**Animations** can be created by adding the `animation` properties, and then defining the `keyframes`:
```css
p {
  text-align: center;
  font-size: 20vh;

  animation-name: demo;
  animation-duration: 3s;
}

@keyframes demo {
  from {
    font-size: 0vh;
  }

  95% {
    font-size: 21vh;
  }

  to {
    font-size: 20vh;
  }
}
```

**Responsive Design** is the term for setting up your site to adjust according to screen size and orientation.<br>
<br>
The CSS `display` lets you change how something is displayed in a browser:<br>
+ `none` doesn't display the element (though it's still technically there)
+ `block` fills the width of the parent element (`p` and `div` default to this)
+ `inline` is only as big as the object (`b` and `span` defaults to this)
+ `flex` displays the children in a flexible orientation (distributes them evenly on an axis, either col or row)
+ `grid` displays the children in a grid

Placing this tag in the `head` element will prevent the browser from scaling the site for you based on the screen size and orientation:<br>
```html
<meta name="viewport" content="width=device-width,initial-scale=1" />
```


The `@media` selector is used to manage the responsiveness. The following code rotates the div 270 degrees if the orientation become portrait:

```css
@media (orientation: portrait) {
  div {
    transform: rotate(270deg);
  }
}
```

<br>
The float property can be either right, left, or none to stay fixed while the inline text around it shrinks with the page resizing.
<br>
<br>



Using *Flex*: See [this pen](https://codepen.io/Woolfsky/pen/jOXQQRa) for an example<br>
+ setting `html { height: 100% }` and then `main {flex: 1;}` makes main take up the full site
+ `justify-content: center;` makes the content in the center horizontally
+ `align-items: center;` makes the content in the center vertically
+ when `flex: 0;`, the content does not move from its location

#### Frameworks
Frameworks are a bunch of pre-made CSS so you don't have to start from scratch. *Bootstrap* is the most common framework, followed by the rapidly-approaching competitor, *Tailwind*. [Here](https://codepen.io/leesjensen/pen/JjZavjW) is a great CodePen that uses a lot of Bootstrap's content. <br>
<br>
Getting Bootstrap into your site requires a `link` in the `head` element and a `script` at the end of the `body` element: <br>
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
  </head>
  <body>
    ...
  </body>
</html>
```

and

```html
<body>
  ...

  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
    crossorigin="anonymous"
  ></script>
</body>
```
### JavaScript
Comment in JS with a `//line comment` or `/*block comment*/` <br>
<br>
The console is like a terminal, but it is just an environment for debugging.<br>
You can write substitution elements for strings in JS with `%s`: `console.log('hello %s', 'world');`<br>
You can even style the console output using `%c`: `console.log('%c JavaScript Demo', 'font-size:1.5em; color:green;');`<br>
`'` and `"` both work for strings, but you can create string literals (f-strings) using `` ` ``. You need to use `${eval_me}` around the thing you want to get evaluated in the string literal.<br>

You can time code to see how long it takes to run:<br>
```js
console.time('demo time');
// ... some code that takes a long time.
console.timeEnd('demo time');
// OUTPUT: demo time: 9762.74 ms
```
You can also count how many times a loop occurs:<br>
```js
console.count('a');
// OUTPUT: a: 1
console.count('a');
// OUTPUT: a: 2
console.count('b');
// OUTPUT: b: 1
```
<br>
You import JS into your HTML in the `header` or in the `body`:<br>

```html
<head>
  <script src="javascript.js"></script>
</head>
<body>
  <button onclick="sayHello()">Say Hello</button>
  <button onclick="sayGoodbye()">Say Goodbye</button>
  <script>
    function sayGoodbye() {
      alert('Goodbye');
    }
  </script>
</body>
```

JS variables are declared with either `let` (changeable) or `const` (unchangeable).<br>
Primitive types in JS include `Null`, `Undefined`, `Boolean`, `Number`, `BigInt`, `String`, and `Symbol`<br>
<br>
JavaScript defines several object types. Some of the more commonly used objects include the following.

| Type       | Use                                                                                    | Example                  |
| ---------- | -------------------------------------------------------------------------------------- | ------------------------ |
| `Object`   | A collection of properties represented by name value pairs. Values can be of any type. | `{a:3, b:'fish'}`        |
| `Function` | An object that has the ability to be called.                                           | `function a() {}`        |
| `Date`     | Calendar dates and times.                                                              | `new Date('1995-12-17')` |
| `Array`    | An ordered sequence of any type.                                                       | `[3, 'fish']`            |
| `Map`      | A collection of key value pairs that support efficient lookups.                        | `new Map()`              |
| `JSON`     | A lightweight data-interchange format used to share information across programs.       | `{"a":3, "b":"fish"}`    |

`===` is the equality operator (`==` in python), `&&` is and, `||` is or, `!` is not.<br>
<br>
You can also use the ternary operator. This provides a compact `if else` representation.

```js
a === 1 ? console.log(1) : console.log('not 1');
```

You can also use JS to change the style of elements in the HTML:<br>

```js
var element = document.getElementById("byu");

// Change the text color to green
element.style.color = "green";
```

The following is valid JavaScript syntax for if, else, for, while, and switch statements:<br>

```js
var age = 25;
if (age >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are not yet an adult.");
}

for (var i = 0; i < 5; i++) {
    console.log("Iteration " + i);
}

var count = 0;
while (count < 3) {
    console.log("Count: " + count);
    count++;
}

var day = "Monday";
switch (day) {
    case "Monday":
        console.log("It's the start of the workweek.");
        break;
    case "Friday":
        console.log("It's almost the weekend.");
        break;
    default:
        console.log("It's a regular day.");
}


```

You can add new properties after making JS objects like this:<br>

```js
var person = {
    firstName: "John",
    lastName: "Doe"
};

person.age = 30; // Adding a new property 'age' to the 'person' object
```




#### Functions
This is how you declare a function:<br>
```js
function hello(who) {
  return 'hello ' + who;
}
```

Anonymous function can be unnamed and then just assigned to a variable:<br>
```js
// Anonymous declaration of the function that is later assigned to a variable
const add = function (a, b) {
  return a + b;
};
```

Arrow functions are like lambda functions in Python:<br>
```js
(var1, var2) => var1 + var2
or
(var3, var4) => {return var3 + var4}
```

Arrow functions also inherit the `this` pointer (gets access to creation scope; this is called making a `closure`). This lets them remember the creation-scope variables, even after they have disappeared or were changed in the current scope.


#### JSON
JSON = JavaScript Object Notation (it easily converts to and back from JavaScript)<br>
The most important data type to know is JSON is the `object` (e.g. `{"a":1,"b":"crockford"}`)<br>
A JSON `object` is made up of key-value pairs. The key is always a string, and the value has to be either a `string`, `number`, `boolean`, `object`, `array`, or `null`.<br>

You can convert JSON to, and from, JavaScript using the `JSON.parse` and `JSON.stringify` functions.

```js
const obj = { a: 2, b: 'crockford', c: undefined };
const json = JSON.stringify(obj);
const objFromJson = JSON.parse(json);

console.log(obj, json, objFromJson);

// OUTPUT:
// {a: 2, b: 'crockford', c: undefined}
// {"a":2, "b":"crockford"}
// {a: 2, b: 'crockford'}
```


#### RegEx
Regular expressions are built into JS. You can create a regular expression using the class constructor or a regular expression literal.

```js
const objRegex = new RegExp('ab*', 'i');
const literalRegex = /ab*/i;
```

The `string` class has several functions that accept regular expressions. This includes `match`, `replace`, `search`, and `split`.

```js
const petRegex = /(dog)|(cat)|(bird)/gim;
const text = 'Both cats and dogs are pets, but not rocks.';

text.match(petRegex);
// RETURNS: ['cat', 'dog']

text.replace(petRegex, 'animal');
// RETURNS: Both animals and animals are pets, but not rocks.

petRegex.test(text);
// RETURNS: true
```

#### Rest
If you want to pass in an arbitrate number of parameters, you can use a `rest` parameter, denoted by three dots. The `rest` parameter needs to be the last parameter in the function signature.<br>


```js
function hasNumber(test, ...numbers) {
  return numbers.some((i) => i === test);
}

hasNumber(2, 1, 2, 3);
// RETURNS: true
```


#### Exceptions
JS uses the normal `try`, `catch`, `finally`, and `throw` syntax. If an exception is `thrown` in the `try` block, the interpreter will skip the rest of the `try` block and go to the `catch` block. Regardless of whether or not an exception is caught, the `finally` code will run.<br>


```js
try {
  // normal execution code
  let x = 1;
  if (x === 1) {
    throw new Error("This is a custom error message.");
  }
} catch (error) {
  // exception handling code
  console.error("An error occurred: " + error.message);
} finally {
  // always called code
  console.log("This happens no matter what")
}
```

#### Destructuring
Destructuring is when you pull out elements of an object or array, and storing them as new variables.<br>
E.g., `const a = [1, 2, 4, 5]; const [b, c] = a; console.log(b, c); //output: 1, 2`


#### JS Objects and Classes
JS uses the term `object` to refer to both any object (Promise, Map, Object, Function, Date...) and then the `Object` object (key value pairs). You create an `Object` using the `new` keyword (`const obj = new Object({a:3})`). You can assign a value to a `property` (key) using the dot notation or bracket notation (`obj.name = 'Skyler' or obj[name] = 'Skyler'`). Keys need to be either a `string` or a `symbol` (i.e. 'name' and name are valid). Values can be any data type.<br>
<br>
Three important Object functions include `entries` (`Object.entries(obj)`) which outputs an array of key value pairs, `keys` (`Object.keys(obj)`) which outputs an array of keys, and `values` (`Object.values(obj)`) which outputs an array of values.<br>
<br>
Any function that returns an object is considered a constructor and can be invoked with the new operator.<br>
<br>
JS Objects have the `this` pointer so it can reference itself as part of an Object method (really just a key that has a function as a value).<br>
<br>
Classes can be used to define Objects. Class declarations look similar to declaring an object, but classes have an explicit constructor and assumed function declarations. `#` is used to make a class function or property private.


```js
class Person {
  constructor(name) {
    this.name = name;
    this.#secretName = this.name + ' (secret shhhh!)';
  }

  log() {
    console.log('My name is ' + this.name);
  }
}

const p = new Person('Eich');
p.log();
// OUTPUT: My name is Eich
```

Inheritance can be used with classes by using the `extends` keyword in the class declaration. `super` is how you access or override parent class elements.

```js
class Employee extends Person {
  constructor(name, position) {
    super(name);
    this.position = position;
  }

  print() {
    return super.print() + '. I am a ' + this.position;
  }
}
```

`static` functions and attributes for a class are only accessible to the class, not the instances of that class.
`get` and `set` functions are methods within a class where you formally set or get a (usually private) attribute of a class instance.
`super()` is how you call the parent class constructor (essentially `__init__`) in python.

#### Scope
JS uses scope to determine which variables are visible in different situations:
- Global - Visible to all code (`this` in global scope is the window)
- Module - Visible to all code running in a module
- Function - Visible within a function
- Block - Visible within a block of code delimited by curly braces

A closure is defined as a function and its surrounding state. When an object creates a function, that function has access to the object's `this` pointer. When an object *creates* an arrow function, that arrow function has access to the global `this` (assuming it's called in the global scope. However, when an object *returns* an arrow function, that arrow function has access to the object's `this`.

#### Document Object Model (DOM)
You can **access** the DOM through the `document` variable in JS. `document` is the root node of the DOM. Every element in the DOM is a node. The `.children` method of a node is a list of the child elements. `document.querySelectorAll('p')` lets you interact with all the `p` elements in the DOM. `.textContent` is all the text in the element. `innerHTML` is a textual representation of the node's html.<br>
<br>
You can **manipulate** the DOM using `document` too. First, make the object, then append it to an existing item in the DOM:<br>

```js
function insertChild(parentSelector, text) {
  const newChild = document.createElement('div');
  newChild.textContent = text;

  const parentElement = document.querySelector(parentSelector);
  parentElement.appendChild(newChild);
}

insertChild('#courses', 'new course');
```

Similar to `.appendChild`, `.removeChild` removes an element.<br>
<br>
You can *inject* entire blocks of HTML code in the DOM using `innerHTML`:

```js
const el = document.querySelector('div');
el.innerHTML = '<div class="injected"><b>Hello</b>!</div>';
```

Note, injecting HTML is often a route taken by hackers so be careful.<br>
<br>
**Event listeners** can be added in these two ways:<br>

```js
const submitDataEl = document.querySelector('#submitData');
submitDataEl.addEventListener('click', function (event) {
  console.log(event.type);
});
```

```html
<button onclick='alert("clicked")'>click me</button>
```

**Local storage** can be used to store information across user sessions and different HTML pages. There are four main methods that can be used with localStorage:

| Function             | Meaning                                      |
| -------------------- | -------------------------------------------- |
| .setItem(name, value) | Sets a named item's value into local storage |
| .getItem(name)        | Gets a named item's value from local storage |
| .removeItem(name)     | Removes a named item from local storage      |
| .clear()              | Clears all items in local storage            |


**Promises** in JS are used to asynchronously run code in parallel with other code (but not actually at the same time). A `promise` can be in one of three states: pending, fulfilled, or rejected.

```js
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve(Math.random() > 0.5 ? 'heads' : 'tails');
    } else {
      reject('fell off table');
    }
  }, 10000);
});
```

The `promise` object has three methods: then, catch, and finally. The then function is called if the promise is fulfilled, catch is called if the promise is rejected, and finally is always called after all the processing is completed:

```js
coinToss
  .then((result) => console.log(`Coin toss result: ${result}`))
  .catch((err) => console.log(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));

// OUTPUT:
//    Coin toss result: tails
//    Toss completed
```

**Async/Await** is a better way than using promises. The `async` keyword declares that a function returns a promise. The `await` keyword wraps a call to the `async` function, blocks execution until the promise has resolved, and then returns the result of the promise. If you return an asynchronous function without prefixing it with `await`, it will just return a promise that is stuck in the *pending* state. By prefixing the asynchronous function with `await`, the execution of the function will be held up until it resolves to either *fulfilled* or *rejected*. You can convert between a promise structure of `.then`s and `.finally`s and the async `try`, `catch`, `finally` structure:

**then/catch chain version**

```js
coinToss()
  .then((result) => console.log(`Toss result ${result}`))
  .catch((err) => console.error(`Error: ${err}`))
  .finally(() => console.log(`Toss completed`));
```

**async, try/catch version**

```js
try {
  const result = await coinToss();
  console.log(`Toss result ${result}`);
} catch (err) {
  console.error(`Error: ${err}`);
} finally {
  console.log(`Toss completed`);
}
```


### Terminal

Some helpful terminal commands include:

+ chmod: Change file permissions.
+ pwd (Print Working Directory): Display current directory.
+ cd (Change Directory): Change directory.ls (List): List files and directories.
+ vim: Open the Vim text editor.
+ nano: Open the Nano text editor.
+ mkdir (Make Directory): Create a new directory.
+ mv (Move): Rename or move files/directories.
+ rm (Remove): Delete files/directories.
+ man (Manual): Access command documentation.
+ ssh (Secure Shell): Connect to remote servers securely.
+ ps (Process Status): Display running processes.
+ wget: Download files from the internet.
+ sudo (Superuser Do): Execute commands with elevated privileges.
+ ssh: creates a remote shell session.
+ ls: lists items (when you run `ls -la`, you'll get a *long format*(l) listing of all files and directories in the current directory, including *hidden ones*(a))



### Web Services
Rendering HTML, JS, CSS are all part of the `frontend` of the web server (things that happen just within the user's browser). When our frontend JS makes requests to other services on the internet, we use the `fetch` command. `fetch` requests are used for things like storing data persistently, providing security, running tasks, executing application logic you don't want the user to see, and communicating with other users. You can access web service `endpoints` or `APIs` with the fetch command. The functionality represents the `backend`. <br>
<br>

**Fetch** takes a URL and returns a promise. When the URL content is obtained, the `.then` methods are executed. If the returned content is of type `application/json` you can use the `json` function on the response object to convert it to a JavaScript object:


```js
fetch('https://api.quotable.io/random')
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(jsonResponse);
  });
```

To do a `POST` request you populate the options parameter with the HTTP method and headers.

```js
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'test title',
    body: 'test body',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(jsonResponse);
  });
```



Uniform Resource Locator (**URL**) is the address of any web service, website, or piece of data (images, videos...). Here is how a URL is structured (note, only the scheme and the domain name are required):


```yaml
<scheme>://<domain name>:<port>/<path>?<parameters>#<anchor>

https://byu.edu:443/cs/260/student?filter=accepted#summary
```

**Port** numbers allow a single device to support multiple protocols (e.g. HTTP, HTTPS, FTP, or SSH) as well as different types of services (e.g. search, document, or authentication).
<br> <br>

**HTTP** is how the web communicates. When a web client (e.g. a web browser) and a web server talk they exchange HTTP requests and responses. You can see this conversation with the `curl` command:

```sh
curl -v -s http://info.cern.ch/hypertext/WWW/Helping.html
```

An HTTP request has this syntax:

```yaml
<verb> <url path, parameters, anchor> <version>
[<header key: value>]*
[

  <body>
]
```

For example:

```http
GET /hypertext/WWW/Helping.html HTTP/1.1
Host: info.cern.ch
Accept: text/html
```

An HTTP response has the following syntax.

```yaml
<version> <status code> <status string>
[<header key: value>]*
[

  <body>
]
```

For example:

```yaml
HTTP/1.1 200 OK
Date: Tue, 06 Dec 2022 21:54:42 GMT
Server: Apache
Last-Modified: Thu, 29 Oct 1992 11:15:20 GMT
ETag: "5f0-28f29422b8200"
Accept-Ranges: bytes
Content-Length: 1520
Connection: close
Content-Type: text/html
```


**Verbs** are used in requests. Common verbs include `GET` (get the requested resource), `POST` (create a new resource), `PUT` (update the resource), `DELETE` (delete the resource), and `OPTIONS` (get metadata about the resource).<br>
Status codes are part of the response. Here are the basic grouping:

- 1xx - Informational.
- 2xx - Success.
- 3xx - Redirect to some other location, or that the previously cached resource is still valid.
- 4xx - Client errors. The request is invalid.
- 5xx - Server errors. The request cannot be satisfied due to an error on the server.

Here are some specific, common responses:

| Code | Text                                                                                 | Meaning                                                                                                                           |
| ---- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| 100  | Continue                                                                             | The service is working on the request                                                                                             |
| 200  | Success                                                                              | The requested resource was found and returned as appropriate.                                                                     |
| 201  | Created                                                                              | The request was successful and a new resource was created.                                                                        |
| 204  | No Content                                                                           | The request was successful but no resource is returned.                                                                           |
| 304  | Not Modified                                                                         | The cached version of the resource is still valid.                                                                                |
| 307  | Permanent redirect                                                                   | The resource is no longer at the requested location. The new location is specified in the response location header.               |
| 308  | Temporary redirect                                                                   | The resource is temporarily located at a different location. The temporary location is specified in the response location header. |
| 400  | Bad request                                                                          | The request was malformed or invalid.                                                                                             |
| 401  | Unauthorized                                                                         | The request did not provide a valid authentication token.                                                                         |
| 403  | Forbidden                                                                            | The provided authentication token is not authorized for the resource.                                                             |
| 404  | Not found                                                                            | An unknown resource was requested.                                                                                                |
| 408  | Request timeout                                                                      | The request takes too long.                                                                                                       |
| 409  | Conflict                                                                             | The provided resource represents an out of date version of the resource.                                                          |                                                                               |
| 429  | Too many requests                                                                    | The client is making too many requests in too short of a time period.                                                             |
| 500  | Internal server error                                                                | The server failed to properly process the request.                                                                                |
| 503  | Service unavailable                                                                  | The server is temporarily down. The client should try again with an exponential back off. 



HTTP **headers** specify metadata about a request or response. This includes things like how to handle security, caching, data formats, and cookies. <br> <br>

The format of the **body** of an HTTP request or response is defined by the Content-Type header. For example, it may be HTML text (text/html), a binary image format (image/png), JSON (application/json), or JavaScript (text/javascript).<br> <br>

One common method for tracking *state* is the **cookie**. Cookies are generated by a server and passed to the client as an HTTP header. The client then caches the cookie and returns it as an HTTP header back to the server on subsequent requests.<br>
<br>

**Security**: `Same Origin Policy` (SOP) was created to only allows JavaScript to make requests to a domain if it is the same domain that the user is currently viewing. `Cross Origin Resource Sharing` (CORS) was invented to allow the client (e.g. browser) to specify the origin of a request and then let the server respond with what origins are allowed.


## Node.js
Node.js runs Chrome's V8 engine outside of a browser. You need to install Node.js in both your prod and dev environments. This is done through the `Node Version Manager` (NVM). You can execute a line of JavaScript with Node.js from your console with the `-e` parameter.

```sh
➜  node -e "console.log(1+1)"
2
```

You can execute a js file by typing `node my_file.js`. You can write and execute JS directly by using node's interactive environment by typing `node` in the terminal (it acts like typing `python3` in the terminal).<br> <br>

To load a package using Node.js you must take two steps. First install the package locally on your machine using the `Node Package Manager` (NPM), and then include a `require` statement in your code that references the package name. NPM is automatically installed when you install Node.js. Before you start using NPM to install packages you need to initialize your code to use NPM. Create a new directory that will hold all your js, navigate there, and run the `npm init -y` function:

```sh
➜  mkdir npmtest
➜  cd npmtest
➜  npm init -y
```

You can then install new packages using this syntax: `npm install <package name>`, e.g., `npm install give-me-a-joke`. As you add more and more packages, the directory `node_modules` will get very large. Make sure you include n`ode_modules` in your `.gitignore` file so it's not copied every time!<br><br>

In summary,

1. Create your project directory
2. Initialize it for use with NPM by running `npm init -y`
3. Make sure `.gitignore` file contains `node_modules`
4. Install any desired packages with `npm install <package name here>`
5. Add `require('<package name here>')` to your application's JavaScript
6. Use the code the package provides in your JavaScript
7. Run your code with `node index.js`

## Express
Express is a Node.js package that helps with:
+ Routing requests for service endpoints
+ Manipulating HTTP requests with JSON body content
+ Generating HTTP responses
+ Using middleware to add functionality

You create an Express application by using NPM to install the Express package and then calling the `express` constructor to create the Express application and listen for HTTP requests on a desired port.

```sh
➜ npm install express
```

```js
const express = require('express');
const app = express();

app.listen(8080);
```

You can then call all the HTTP verbs as methods to your `app` object.
