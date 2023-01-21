const fs = require('fs');
const path = require('path');

const readTHISfile = () => {

}

const re_configureIDs = (database) => {
    for(let i = 0; i <= database.length - 1; i ++){
        database[i].id = i + 1;
    }
    return database;
}

const saveChange = (database) => {

    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(database, null, 2), err => {
        err ? console.error(err) : console.log('\n\x1b[32mFile Updated\x1b[0m\n');
    });

}

module.exports = { saveChange, re_configureIDs };