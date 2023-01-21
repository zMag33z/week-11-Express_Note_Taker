const fs = require('fs');
const path = require('path');

const readTHISfile = () => {

}


const postANDsave = (saveNewNote, database) => {
    database.push(saveNewNote);
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(database), err => {
        err ? console.error(err) : console.log('Note saved')
    });

}

module.exports = postANDsave;