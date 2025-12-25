const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Imana123!',
    database: 'webshop_db'
});

db.connect(err => {
    if (err) {
        console.error('Greška pri spajanju na bazu:', err);
    } else {
        console.log('Povezano na MySQL bazu');
    }
});

module.exports = db;
