const express = require('express');
const path = require('path');
const api = require('./routeNotes/api');
// const savedNotes = require('./db/db.json');


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

// ask if i need to remove this???
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} or Heroku ${PORT}`));








//stu 26
// const express = require('express');
// const path = require('path');
// const { clog } = require('./middleware/clog');
// const api = require('./routes/index.js');

// const PORT = process.env.PORT || 3001;

// const app = express();

// // Import custom middleware, "cLog"
// app.use(clog);

// // Middleware for parsing JSON and urlencoded form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

// Middleware express static page
// app.use(express.static('public'));

// // GET Route for homepage
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

// // GET Route for notes page
// app.get('/notes', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/notes.html'))
// );

// app.listen(PORT, () =>
//   console.log(`App listening at http://localhost:${PORT}`)
// );