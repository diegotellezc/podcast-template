const express = require("express");
const router = express.Router();
const getJson = require("../public/js/api");

// routes
router.get("/", async (req, res) => {
  try {
    const data = await getJson();
    res.render("home", { data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error. There were problems getting the data");
  }
});

module.exports = router;
