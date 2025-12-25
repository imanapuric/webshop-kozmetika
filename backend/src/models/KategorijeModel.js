const db = require('../config/db');

const Kategorija = {
    getAll: (cb) => {
        db.query('SELECT * FROM kategorije', cb);
    },

    create: (data, cb) => {
        db.query(
            'INSERT INTO kategorije (naziv, opis) VALUES (?, ?)',
            [data.naziv, data.opis],
            cb
        );
    },

    update: (id, data, cb) => {
        db.query(
            'UPDATE kategorije SET naziv = ?, opis = ? WHERE id = ?',
            [data.naziv, data.opis, id],
            cb
        );
    },

    delete: (id, cb) => {
        db.query('DELETE FROM kategorije WHERE id = ?', [id], cb);
    }
};

module.exports = Kategorija;
