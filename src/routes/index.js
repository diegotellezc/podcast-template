const express = require("express");
const router = express.Router();

// colocar las rutas aquí
router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;
