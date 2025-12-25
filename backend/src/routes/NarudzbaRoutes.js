const express = require("express");
const router = express.Router();
const controller = require("../controllers/NarudzbaController");

// ✅ Admin
router.get("/", controller.getAll);

// ✅ Korisnik (moje narudžbe)
router.get("/moje/:korisnik_id", controller.getMoje);

// ✅ Stavke / detalji
router.get("/:id/stavke", controller.getStavke);

router.post("/", controller.create);

router.put("/:id/status", controller.updateStatus);

module.exports = router;
