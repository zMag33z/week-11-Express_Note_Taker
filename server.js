const express = require('express');
const path = require('path');
const api = require('./routeNotes/api');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow index.js to fetch methods
app.use('/api', api);

// Middleware express static page in public
app.use(express.static('public'));

// link to index from notes
app.get('/', (req, res) => {res.sendFile(path.join(__dirname, '/public/index.html'))});

// link from index to notes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// app listen to port for localhost and confirm
app.listen(PORT, () => console.log(`\n\x1b[32mApp listening at \x1b[34mhttp://localhost:${PORT}\x1b[0m\n`));


/*  zMaG33z  */