const db = require('../config/db');

const Proizvod = {
    getAll: (cb) => {
        const sql = `
      SELECT p.*, k.naziv AS kategorija
      FROM proizvodi p
      JOIN kategorije k ON p.kategorija_id = k.id
    `;
        db.query(sql, cb);
    },

    create: (data, cb) => {
        const sql = `
      INSERT INTO proizvodi (naziv, opis, cijena, kolicina, kategorija_id)
      VALUES (?, ?, ?, ?, ?)
    `;
        db.query(
            sql,
            [
                data.naziv,
                data.opis,
                data.cijena,
                data.kolicina,
                data.kategorija_id
            ],
            cb
        );
    },

    update: (id, data, cb) => {
        const sql = `
      UPDATE proizvodi
      SET naziv = ?, opis = ?, cijena = ?, kolicina = ?, kategorija_id = ?
      WHERE id = ?
    `;
        db.query(
            sql,
            [
                data.naziv,
                data.opis,
                data.cijena,
                data.kolicina,
                data.kategorija_id,
                id
            ],
            cb
        );
    },

    delete: (id, cb) => {
        const sql = 'DELETE FROM proizvodi WHERE id = ?';
        db.query(sql, [id], cb);
    }
};

module.exports = Proizvod;
