const express = require("express");
const Controller = require("../controller/dataController");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/search");
});

router.get("/search", Controller.searchLogs);

module.exports = router;