const express = require("express");
const router = express.Router();
const getJson = require("../public/js/api");

// routes
router.get("/", async (req, res) => {
  try {
    const data = await getJson();
    res.render("home", { data });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).send("Error al obtener los datos de la API");
  }
});

module.exports = router;
