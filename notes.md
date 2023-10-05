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
<br>
There are three ways to associate a CSS rule with your HTML:
+ within a single element (highest precedence): `<p style="color:green">CSS</p>`
+ as a style element in the `head` of the HTML: `<head><style>...put a rule here...</style></head>`
+ by hyperlinking the external file (lowest precedence): `<link rel="stylesheet" href="styles.css" />`

Child elements inherit the rules of their parent elements all the way up. Rules can be overridden by the child elements if desired.<br>
<br>
The box model is how CSS holds everything. From smallest to largest is content (text/images) > padding (inherits background color) > border (color/thickness/line stype) > margin (only represents whitespace)<br>
<br>
CSS Selectors are used to cascade the style down throughout the document. 
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


