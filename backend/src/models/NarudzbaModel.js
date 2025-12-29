const db = require("../config/db");

const Narudzba = {

    // kreiranje narudžbe + stavki
    create: (korisnik_id, ukupno, stavke, cb) => {

        // 1) kreiraj narudzbu
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

    // Admin: sve narudžbe
    getAll: (cb) => {
        const sql = `
            SELECT n.*, k.ime AS korisnik_ime, k.email AS korisnik_email
            FROM narudzbe n
            JOIN korisnici k ON n.korisnik_id = k.id
            ORDER BY n.datum_kreiranja DESC
        `;
        db.query(sql, cb);
    },

    // Korisnik: samo moje narudžbe
    getByKorisnik: (korisnik_id, cb) => {
        const sql = `
            SELECT *
            FROM narudzbe
            WHERE korisnik_id = ?
            ORDER BY datum_kreiranja DESC
        `;
        db.query(sql, [korisnik_id], cb);
    },

    // Stavke narudžbe (detalji)
    getStavke: (narudzba_id, cb) => {
        const sql = `
            SELECT s.*, p.naziv
            FROM stavke_narudzbe s
            JOIN proizvodi p ON s.proizvod_id = p.id
            WHERE s.narudzba_id = ?
        `;
        db.query(sql, [narudzba_id], cb);
    },
    // Update status narudžbe (Admin)
    updateStatus: (narudzba_id, status, cb) => {
        // First, fetch current status to avoid double-decrement
        db.query('SELECT status FROM narudzbe WHERE id = ?', [narudzba_id], (err, rows) => {
            if (err) return cb(err);
            if (!rows || rows.length === 0) return cb(new Error('Narudžba ne postoji'));

            const currentStatus = rows[0].status;
            const newStatus = status;

            // helper to just update status without inventory changes
            const justUpdateStatus = (done) => {
                const sql = `
                    UPDATE narudzbe
                    SET status = ?
                    WHERE id = ?
                `;
                db.query(sql, [newStatus, narudzba_id], done);
            };

            // ako je status stavljen na 'poslano' smanji se kolicina u bazi
            if (String(newStatus).toLowerCase() === 'poslano' && String(currentStatus).toLowerCase() !== 'poslano') {
                // Start transaction
                db.beginTransaction((txErr) => {
                    if (txErr) return cb(txErr);

                    // 1) update narudzbe.status
                    const sqlUpdate = `UPDATE narudzbe SET status = ? WHERE id = ?`;
                    db.query(sqlUpdate, [newStatus, narudzba_id], (uErr) => {
                        if (uErr) {
                            return db.rollback(() => cb(uErr));
                        }

                        // 2) get stavke for this order
                        const sqlStavke = `SELECT proizvod_id, kolicina FROM stavke_narudzbe WHERE narudzba_id = ?`;
                        db.query(sqlStavke, [narudzba_id], (sErr, stavke) => {
                            if (sErr) {
                                return db.rollback(() => cb(sErr));
                            }

                            if (!stavke || stavke.length === 0) {
                                // nothing to decrement, commit
                                return db.commit((cErr) => {
                                    if (cErr) return db.rollback(() => cb(cErr));
                                    cb(null);
                                });
                            }

                            // For each stavka, decrement proizvodi.kolicina = GREATEST(kolicina - ?, 0)
                            let pending = stavke.length;
                            let failed = false;

                            stavke.forEach((st) => {
                                const sqlDec = `UPDATE proizvodi SET kolicina = GREATEST(kolicina - ?, 0) WHERE id = ?`;
                                db.query(sqlDec, [st.kolicina, st.proizvod_id], (dErr) => {
                                    if (dErr) {
                                        failed = true;
                                        // rollback once on error
                                        return db.rollback(() => cb(dErr));
                                    }

                                    pending -= 1;
                                    if (pending === 0 && !failed) {
                                        db.commit((cErr) => {
                                            if (cErr) return db.rollback(() => cb(cErr));
                                            cb(null);
                                        });
                                    }
                                });
                            });

                        });
                    });
                });
            } else {
                // No inventory change needed, just update status
                justUpdateStatus(cb);
            }
        });
    },

};

module.exports = Narudzba;
