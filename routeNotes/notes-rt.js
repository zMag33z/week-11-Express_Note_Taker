const notes = require('express').Router();
const postANDsave = require('../modifier/modify-db');
const fs = require('fs');

const database = require('../db/db.json');

// fetch method get database of saved notes to be rendered on notes.html
notes.get('/', (req, res) => {
    res.json(database);
});

// fetch method post new note to page and save to database
notes.post('/', (req, res) => {
    const newNote = req.body;
    let savedNote = postANDsave(newNote, database);
    res.json(savedNote);
});

notes.delete(`/`, (req, res) => {
    console.log(req.id);
});


module.exports = notes;