const express = require("express");
const cors = require("cors");

const app = express();
const path = require("path");
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
// TEST ruta
app.get("/api/test", (req, res) => {
    res.json({ poruka: "Backend radi" });
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

// narudzbe
const narudzbaRoutes = require("./routes/NarudzbaRoutes");
app.use("/api/narudzbe", narudzbaRoutes);

module.exports = app;
