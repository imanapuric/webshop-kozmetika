const Proizvod = require('../models/ProizvodModel');

exports.getAll = (req, res) => {
    Proizvod.getAll((err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
};

exports.create = (req, res) => {
    const data = {
        ...req.body,
        slika: req.file ? req.file.filename : null
    };

    Proizvod.create(data, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ poruka: "Proizvod dodan" });
    });
};


exports.update = (req, res) => {
    const data = {
        ...req.body,
        slika: req.file ? req.file.filename : req.body.slika
    };

    Proizvod.update(req.params.id, data, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ poruka: "Proizvod ažuriran" });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id || req.body.id;

    if (!id) return res.status(400).json({ poruka: "ID missing" });

    Proizvod.delete(id, (err, result) => {
        if (err) {
            return res.status(500).json({ poruka: "Greška pri brisanju", error: err });
        }

        const affected = result?.affectedRows ?? result?.rowCount;
        if (typeof affected === "number" && affected === 0) {
            return res.status(404).json({ poruka: "Proizvod nije pronađen" });
        }

        res.json({ poruka: "Proizvod obrisan" });
    });
};



exports.getById = (req, res) => {
    Proizvod.getById(req.params.id, (err, row) => {
        if (err) return res.status(500).json(err);
        if (!row) return res.status(404).json({ poruka: 'Proizvod nije pronađen' });
        res.json(row);
    });
};

