const express = require("express");
const router = express.Router();
const controller = require("../controllers/NarudzbaController");
const authorize = require("../middleware/authorize");

// Admin - sve narudžbe
router.get("/", authorize(["ADMIN"]), controller.getAll);

// Korisnik (moje narudžbe)
router.get("/moje/:korisnik_id", authorize(), controller.getMoje);

// Stavke / detalji
router.get("/:id/stavke", authorize(), controller.getStavke);

router.post("/", authorize(), controller.create);

router.put("/:id/status", authorize(["ADMIN"]), controller.updateStatus);

module.exports = router;
