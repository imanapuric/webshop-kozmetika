const db = require("../config/db");

const Narudzba = {

    // ✅ POST - kreiranje narudžbe + stavki
    create: (korisnik_id, ukupno, stavke, cb) => {

        // 1) kreiraj narudžbu
        const sqlNarudzba = `
            INSERT INTO narudzbe (korisnik_id, ukupno)
            VALUES (?, ?)
        `;

        db.query(sqlNarudzba, [korisnik_id, ukupno], (err, result) => {
            if (err) return cb(err);

            const narudzba_id = result.insertId;

            // 2) ubaci stavke
            const sqlStavke = `
                INSERT INTO stavke_narudzbe (narudzba_id, proizvod_id, kolicina, cijena)
                VALUES ?
            `;

            const values = stavke.map(s => [
                narudzba_id,
                s.proizvod_id,
                s.kolicina,
                s.cijena
            ]);

            db.query(sqlStavke, [values], (err2) => {
                if (err2) return cb(err2);

                cb(null, { narudzba_id });
            });
        });
    },

    // ✅ Admin: sve narudžbe
    getAll: (cb) => {
        const sql = `
            SELECT n.*, k.ime AS korisnik_ime, k.email AS korisnik_email
            FROM narudzbe n
            JOIN korisnici k ON n.korisnik_id = k.id
            ORDER BY n.datum_kreiranja DESC
        `;
        db.query(sql, cb);
    },

    // ✅ Korisnik: samo moje narudžbe
    getByKorisnik: (korisnik_id, cb) => {
        const sql = `
            SELECT *
            FROM narudzbe
            WHERE korisnik_id = ?
            ORDER BY datum_kreiranja DESC
        `;
        db.query(sql, [korisnik_id], cb);
    },

    // ✅ Stavke narudžbe (detalji)
    getStavke: (narudzba_id, cb) => {
        const sql = `
            SELECT s.*, p.naziv
            FROM stavke_narudzbe s
            JOIN proizvodi p ON s.proizvod_id = p.id
            WHERE s.narudzba_id = ?
        `;
        db.query(sql, [narudzba_id], cb);
    },
    // ✅ Update status narudžbe (Admin)
    updateStatus: (narudzba_id, status, cb) => {
        const sql = `
        UPDATE narudzbe
        SET status = ?
        WHERE id = ?
    `;
        db.query(sql, [status, narudzba_id], cb);
    },

};

module.exports = Narudzba;
