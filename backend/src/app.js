const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// TEST ruta
app.get('/api/test', (req, res) => {
    res.json({ poruka: 'Backend radi' });
});

// RUTE
const kategorijaRoutes = require('./routes/KategorijaRoutes');
app.use('/api/kategorije', kategorijaRoutes);

module.exports = app;
