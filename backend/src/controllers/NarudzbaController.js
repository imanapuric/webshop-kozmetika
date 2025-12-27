const Narudzba = require("../models/NarudzbaModel");

/*
 ADMIN vidi sve narudžbe
 GET /api/narudzbe?uloga=ADMIN
 */
exports.getAll = (req, res) => {
    // prefer role from middleware (req.uloga), fallback to query param for backward compatibility
    const uloga = req.uloga || req.query?.uloga;

    if (uloga !== "ADMIN") {
        return res.status(403).json({ poruka: "Zabranjen pristup!" });
    }

    Narudzba.getAll((err, rows) => {
        if (err) {
            return res.status(500).json({ poruka: "Greška pri dohvaćanju narudžbi!" });
        }
        res.json(rows);
    });
};

/*
 USER / ADMIN vidi svoje narudžbe
 GET /api/narudzbe/moje?korisnik_id=1
 */
exports.getMoje = (req, res) => {
    const korisnik_id = req.params.korisnik_id || req.query?.korisnik_id;

    if (!korisnik_id) {
        return res.status(400).json({ poruka: "Korisnik nije definisan!" });
    }

    Narudzba.getByKorisnik(korisnik_id, (err, rows) => {
        if (err) {
            return res.status(500).json({ poruka: "Greška pri dohvaćanju narudžbi" });
        }
        res.json(rows);
    });
};

/*
 USER / ADMIN vidi stavke neke narudžbe
 GET /api/narudzbe/:id/stavke
 */
exports.getStavke = (req, res) => {
    const narudzba_id = req.params.id;

    if (!narudzba_id) {
        return res.status(400).json({ poruka: "Narudžba nije definisana!" });
    }

    Narudzba.getStavke(narudzba_id, (err, rows) => {
        if (err) {
            return res.status(500).json({ poruka: "Greška pri dohvaćanju stavki!" });
        }
        res.json(rows);
    });
};

/*
USER ,,, kreiranje narudžbe
POST /api/narudzbe
 */
exports.create = (req, res) => {
    const { korisnik_id, ukupno, stavke } = req.body;

    if (!korisnik_id || !ukupno || !Array.isArray(stavke) || stavke.length === 0) {
        return res.status(400).json({ poruka: "Podaci nisu kompletni!" });
    }

    Narudzba.create(korisnik_id, ukupno, stavke, (err, result) => {
        if (err) {
            return res.status(500).json({ poruka: "Greška pri kreiranju narudžbe!" });
        }

        res.json({
            poruka: "Narudžba uspješno kreirana!",
            narudzba_id: result.narudzba_id
        });
    });
};

/*
 ADMIN ,,, promjena statusa
 PUT /api/narudzbe/:id
 body: { status, uloga }
 */
exports.updateStatus = (req, res) => {
    const narudzba_id = req.params.id;
    // prefer req.uloga injected by middleware
    const uloga = req.uloga || req.body?.uloga;
    const { status } = req.body;

    if (uloga !== "ADMIN") {
        return res.status(403).json({ poruka: "Samo admin može mijenjati status!" });
    }

    if (!status) {
        return res.status(400).json({ poruka: "Status je obavezan!" });
    }

    Narudzba.updateStatus(narudzba_id, status, (err) => {
        if (err) {
            return res.status(500).json({ poruka: "Greška pri ažuriranju statusa!" });
        }

        res.json({ poruka: "Status uspješno ažuriran!" });
    });
};
