const express = require("express");
const router = express.Router();
const { Restaurant, Menu, MenuItem } = require("../../database/models");
const { Op } = require("sequelize");
const { respond404 } = require("./helperFunctions");

router
  .route("/")

  .get(async (req, res) => {
    const restaurants = await Restaurant.findAll();

    res.json(restaurants);
  })

  .post(async (req, res) => {});

router
  .route("/:id")

  .get(async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);

    if (restaurant) {
      res.json(restaurant);
    } else {
      respond404(req, res);
    }
  });

router
  .route("/:id/menus")

  .get(async (req, res) => {
    const menus = await Menu.findAll({
      where: { restaurant_id: req.params.id },
    });

    res.json(menus);
  });

router
  .route("/:id/menus/:menu_id")

  .get(async (req, res) => {
    const menu = await Menu.findOne({
      where: {
        [Op.and]: [
          { restaurant_id: req.params.id },
          { id: req.params.menu_id },
        ],
      },
    });

    if (menu) {
      res.json(menu);
    } else {
      respond404(req, res);
    }
  });

router
  .route("/:id/menus/:menu_id/menuItems")

  .get(async (req, res) => {
    // We get the menu for validation that :id ==
    let menu = Menu.findByPk(req.params.menu_id);
    let menuItems = MenuItem.findAll({
      where: { menu_id: req.params.menu_id },
    });

    [menu, menuItems] = await Promise.all([menu, menuItems]);

    if (menu.restaurant_id.toString() === req.params.id) {
      res.json(menuItems);
    } else {
      respond404(req, res);
    }
  });

router
  .route("/:id/menus/:menu_id/menuItems/:menuItem_id")

  .get(async (req, res) => {
    // We get the menu for validation that :id ==
    let menu = Menu.findByPk(req.params.menu_id);
    let menuItem = MenuItem.findOne({
      where: {
        [Op.and]: [
          { menu_id: req.params.menu_id },
          { id: req.params.menuItem_id },
        ],
      },
    });

    [menu, menuItem] = await Promise.all([menu, menuItem]);

    if (menu.restaurant_id.toString() === req.params.id) {
      res.json(menuItem);
    } else {
      respond404(req, res);
    }
  });

module.exports = router;
