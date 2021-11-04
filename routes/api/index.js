const express = require("express");
const router = express.Router();
const app = require("../../app");
const apicache = require("apicache");

// We only want to cache api requests that are GET
const onlyGetRequests = (req, res) => req.method === "GET";
router.use(apicache.middleware("1 seconds", onlyGetRequests));

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,OPTIONS,HEAD"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

const restaurantsRouter = require("./restaurants");
const menusRouter = require("./menus");
const menuItemsRouter = require("./menuItems");
router.use("/restaurants", restaurantsRouter);
router.use("/menus", menusRouter);
router.use("/menuItems", menuItemsRouter);

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
