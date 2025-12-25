const Narudzba = require("../models/NarudzbaModel");

// ✅ Admin: lista svih narudžbi
exports.getAll = (req, res) => {
    Narudzba.getAll((err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
};

// ✅ Korisnik: moje narudžbe
exports.getMoje = (req, res) => {
    const korisnik_id = req.params.korisnik_id;

    Narudzba.getByKorisnik(korisnik_id, (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
};

// ✅ Stavke narudžbe (detalji)
exports.getStavke = (req, res) => {
    const narudzba_id = req.params.id;

    Narudzba.getStavke(narudzba_id, (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
};

// ✅ POST - kreiranje narudžbe + stavke
exports.create = (req, res) => {
    const { korisnik_id, ukupno, stavke } = req.body;

    if (!korisnik_id || !ukupno || !stavke || stavke.length === 0) {
        return res.status(400).json({ poruka: "Podaci nisu kompletni!" });
    }

    Narudzba.create(korisnik_id, ukupno, stavke, (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({
            poruka: "Narudžba uspješno kreirana ✅",
            narudzba_id: result.narudzba_id
        });
    });
};
// ✅ PUT - promjena statusa
exports.updateStatus = (req, res) => {
    const narudzba_id = req.params.id;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ poruka: "Status je obavezan!" });
    }

    Narudzba.updateStatus(narudzba_id, status, (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({ poruka: "Status ažuriran ✅" });
    });
};

