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

### Domain names
Domain names are broken up into a subdomain, followed by a root domain. The root domain is made up of a secondary domain followed by a top domain:<br>
`[subdomain.]*secondary.top`  ->  my.byu.edu ("my" is the subdomain, "byu.edu" is the root domain, "byu" is the secondary domain, and "edu" is the top domain)<br>
<br>
A DNS server is a domain name system. This system maps a domain name (like byu.edu) to an IP address (128.187.16.184).

### Caddy/HTTPS/TLS/Web Certificates
Caddy handles web certificates (necessary for HTTPS)<br>
Caddy acts as a gateway for Simon and startup requests (routes port 443 user to the correct place)<br>
<br>
HTTPS (Secure Hypertext Transport Protocol) means a negotiation has taken place to encrypt the data (through TPS protocol) before transferring anything<br>
You can watch the negotiation take place using the `curl` command with the `-v` (verbose) flag:<br>`curl -v -s https://byu.edu > /dev/null`

### HTML
Start each doc with `<!DOCTYPE html>` to tell the browser the doc type<br>
Your main html file (wherever you want the user to initially land) should be titled `index.html`<br>
<br>
Hyperlinks are represented with an `a` tag with the link to the other page in the `href` attribute:<br>
`<a href="https://byu.edu">Go to the Y</a>`<br>
<br>
Comments: `<!-- commented text -->`<br>
<br>
When rendering and working with HTML, adding a CSS border rule can make formatting easier:<br>
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
+ `flex` displays the children in a flexible orientation
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

