const express = require('express');

const routeToNotes = require('./notes-rt');

const calledApi = express();

calledApi.use('/notes', routeToNotes);

module.exports = calledApi;


/*  zMaG33z  */