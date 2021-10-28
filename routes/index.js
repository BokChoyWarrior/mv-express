var express = require("express");
var router = express.Router();
const app = require("../app");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: `Homepage`,
    bodyText: `Welcome!`,
  });
});

router.get("/id/:id", function (req, res, next) {
  res.render("index", {
    title: `ID: ${req.params.id}`,
    bodyText: `ID: ${req.params.id}`,
  });
});

module.exports = router;
