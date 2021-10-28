var express = require("express");
var router = express.Router();

/* GET secret page. */
router.get("/", function (req, res) {
  res.render("index", {
    title: "Secret! Shhh",
    bodyText: "This is a secret page!",
  });
});

module.exports = router;
