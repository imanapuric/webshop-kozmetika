const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// TEST ruta
app.get("/api/test", (req, res) => {
    res.json({ poruka: "Backend radi ✅" });
});

// kategorije
const kategorijaRoutes = require("./routes/KategorijaRoutes");
app.use("/api/kategorije", kategorijaRoutes);

// proizvodi
const proizvodRoutes = require("./routes/ProizvodRoutes");
app.use("/api/proizvodi", proizvodRoutes);

// auth
const authRoutes = require("./routes/AuthRoutes");
app.use("/api/auth", authRoutes);

module.exports = app;
