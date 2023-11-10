const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);


// Get Web Storage Dictionary
apiRouter.get('/getDictionary', (_req, res) => {
    res.json(webStorage);
});

// Update Dictionary
apiRouter.post('/updateDictionary', (req, res) => {
    const key = req.body.key;
    const value = req.body.value;
    webStorage[key] = value;
    res.json(webStorage);
});



// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



let webStorage = {};