## startup notes
### GitHub tutorial takeaways
`git clone <repo url>`  <- clones a repository locally<br>
`git add mytest.txt`  <- stages the edits you made in that file<br>
`git commit -am "my description"`  <- commits changes<br>
`git push`  <- pushed commits to the repo<br>
`git pull`  <- pulls up-to-date version of the repo<br>
`git fetch` then `git status`  <- lets you view changes without automatically updating (as a pull does)

### Server creation takeaways
I can remotely access my server using my terminal with the following command (after moving to the correct directory):<br>
`ssh -i production.pem ubuntu@44.205.237.113`

### Domain names takeaways
Domain names are broken up into a subdomain, followed by a root domain. The root domain is made up of a secondary domain followed by a top domain:<br>
`[subdomain.]*secondary.top`  ->  my.byu.edu ("my" is the subdomain, "byu.edu" is the root domain, "byu" is the secondary domain, and "edu" is the top domain)<br>
<br>
A DNS server is a domain name system. This system maps a domain name (like byu.edu) to an IP address (128.187.16.184).
