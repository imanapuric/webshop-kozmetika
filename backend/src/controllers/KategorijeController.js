const Kategorija = require('../models/KategorijeModel');

exports.getAll = (req, res) => {
    Kategorija.getAll((err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
};

exports.create = (req, res) => {
    Kategorija.create(req.body, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ poruka: 'Kategorija dodana' });
    });
};

exports.update = (req, res) => {
    Kategorija.update(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ poruka: 'Kategorija ažurirana' });
    });
};

exports.delete = (req, res) => {
    Kategorija.delete(req.params.id, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ poruka: 'Kategorija obrisana' });
    });
};
