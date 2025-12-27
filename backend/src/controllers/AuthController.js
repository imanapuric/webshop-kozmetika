const Korisnik = require("../models/KorisnikModel");

exports.login = (req, res) => {
    const { email, lozinka } = req.body;

    if (!email || !lozinka) {
        return res.status(400).json({ poruka: "Email i lozinka su obavezni!" });
    }

    Korisnik.findByEmail(email, (err, rows) => {
        if (err) {
            return res.status(500).json({ poruka: "Greška na serveru" });
        }

        if (rows.length === 0) {
            return res.status(401).json({ poruka: "Korisnik ne postoji!" });
        }

        const korisnik = rows[0];

        // obična provjera lozinke
        if (korisnik.lozinka !== lozinka) {
            return res.status(401).json({ poruka: "Pogrešna lozinka!" });
        }

        // LOGIN USPJEŠAN
        res.json({
            poruka: "Login uspješan ✅",
            korisnik: {
                id: korisnik.id,
                ime: korisnik.ime,
                email: korisnik.email,
                uloga: korisnik.uloga   // 🔑 KLJUČNO
            }
        });
    });
};
