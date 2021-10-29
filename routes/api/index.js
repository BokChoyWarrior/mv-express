const express = require("express");
const router = express.Router();
const app = require("../../app");
const apicache = require("apicache");

// We only want to cache api requests that are GET
const onlyGetRequests = (req, res) => req.method === "GET";
router.use(apicache.middleware("1 minute", onlyGetRequests));

router.use("/restaurants", require("./restaurants"));
router.use("/menus", require("./menus"));
router.use("/menuItems", require("./menuItems"));

// Caching health
// add route to display cache index
router.get("/cache/index", (req, res) => {
  req.apicacheGroup = "cache";
  res.json(apicache.getIndex());
  apicache.clear("cache");
});

// add route to display cache performance (courtesy of @killdash9)
router.get("/cache/performance", (req, res) => {
  req.apicacheGroup = "cache";
  res.json(apicache.getPerformance());
  apicache.clear("cache");
});

module.exports = router;
