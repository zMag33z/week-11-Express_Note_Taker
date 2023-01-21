const notes = require('express').Router();
const { saveChange, re_configureIDs } = require('../modifier/modify-db');
const fs = require('fs');

const database = require('../db/db.json');

// fetch method get database of saved notes to be rendered on notes.html
notes.get('/', (req, res) => {
    return res.json(database);
});

// fetch method post new note to page and save to database
notes.post('/', (req, res) => {    
    req.body.id = database.length + 1;

    const { id, title, text } = req.body
    const newNote = {
        id,
        title,
        text
    };

    database.push(newNote);
    let savedNote = saveChange(database);
    return res.json(savedNote);
});

//fetch method delete
notes.delete('/:id', (req, res) => {
    const removeNoteById = parseInt(req.params.id - 1);
    database.splice(removeNoteById, 1);
    re_configureIDs(database);
    saveChange(database);
    return res.json(database);
});


module.exports = notes;


/*  zMaG33z  */