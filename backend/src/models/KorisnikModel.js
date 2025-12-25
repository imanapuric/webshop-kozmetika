const db = require("../config/db");

const Korisnik = {
    findByEmail: (email, cb) => {
        const sql = "SELECT * FROM korisnici WHERE email = ?";
        db.query(sql, [email], cb);
    }
};

module.exports = Korisnik;
