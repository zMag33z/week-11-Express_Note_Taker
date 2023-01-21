const fs = require('fs');
const path = require('path');

const readTHISfile = () => {

}

const re_configureIDs = (database) => {
    for(let i = 0; i <= database.length - 1; i ++){
        database[i].id = i + 1;
        console.log(database[i].id);
    }
    return database;
}

const saveChange = (database) => {

    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(database, null, 2), err => {
        err ? console.error(err) : console.log('Note saved');
    });

}

module.exports = { saveChange, re_configureIDs };