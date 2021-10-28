const express = require("express");
const router = express.Router();

router.use("/restaurants", require("./restaurants"));
router.use("/menus", require("./menus"));
router.use("/menuItems", require("./menuItems"));

module.exports = router;
