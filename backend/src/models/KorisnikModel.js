const db = require("../config/db");

const Korisnik = {
    findByEmail: (email, cb) => {
        const sql = "SELECT * FROM korisnici WHERE email = ?";
        db.query(sql, [email], cb);
    },

    create: (data, cb) => {
        const sql = `INSERT INTO korisnici (ime, email, lozinka, uloga) VALUES (?, ?, ?, ?)`;
        db.query(sql, [data.ime, data.email, data.lozinka, data.uloga], cb);
    }
};

module.exports = Korisnik;
