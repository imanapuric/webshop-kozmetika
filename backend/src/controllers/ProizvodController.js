const Proizvod = require('../models/ProizvodModel');

exports.getAll = (req, res) => {
    Proizvod.getAll((err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
};

exports.create = (req, res) => {
    Proizvod.create(req.body, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ poruka: 'Proizvod dodan' });
    });
};

exports.update = (req, res) => {
    Proizvod.update(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ poruka: 'Proizvod ažuriran' });
    });
};

exports.delete = (req, res) => {
    Proizvod.delete(req.params.id, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ poruka: 'Proizvod obrisan' });
    });
};

exports.getById = (req, res) => {
    Proizvod.getById(req.params.id, (err, row) => {
        if (err) return res.status(500).json(err);
        if (!row) return res.status(404).json({ poruka: 'Proizvod nije pronađen' });
        res.json(row);
    });
};

