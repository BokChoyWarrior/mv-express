const express = require("express");
const router = express.Router();
const { Restaurant, Menu, MenuItem } = require("../../database/models");
const { Op } = require("sequelize");
const { respond404, respondSuccess, respond400 } = require("./helperFunctions");

// Main route + Create
router
  .route("/")

  .get(async (req, res) => {
    const restaurants = await Restaurant.findAll();

    res.json(restaurants);
  })

  .post(async (req, res) => {
    try {
      const { name, image } = req.body;

      restaurant = await Restaurant.create({ name, image });

      res.status(201).json(restaurant);
    } catch (e) {
      res.status(500).json(e);
    }
  });

// Main route + Update + Delete
router
  .route("/:id")

  .get(async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);

    if (restaurant) {
      res.json(restaurant);
    } else {
      respond404(req, res);
    }
  })

  .put(async (req, res) => {
    const { name, image } = req.body;
    const updated = await Restaurant.update(
      { name, image },
      {
        where: {
          id: req.params.id,
        },
        limit: 1,
      }
    );

    if (updated[0] === 1) {
      respondSuccess(req, res, "Restaurant updated successfully");
    } else {
      respond400(
        req,
        res,
        "Resource cannot be updated becuase it does not exist"
      );
    }
  })

  .delete(async (req, res) => {
    const deleted = await Restaurant.destroy({
      where: {
        id: req.params.id,
      },
      limit: 1,
    });

    if (deleted === 1) {
      respondSuccess(req, res, "Restaurant deleted successfully");
    } else {
      respond400(
        req,
        res,
        "Resource cannot be deleted becuase it does not exist"
      );
    }
  });

// Nested routes
router.get("/:id/menus", async (req, res) => {
  const menus = await Menu.findAll({
    where: { restaurant_id: req.params.id },
  });

  res.json(menus);
});

router.get("/:id/menus/:menu_id", async (req, res) => {
  const menu = await Menu.findOne({
    where: {
      [Op.and]: [{ restaurant_id: req.params.id }, { id: req.params.menu_id }],
    },
  });

  if (menu) {
    res.json(menu);
  } else {
    respond404(req, res);
  }
});

router.get("/:id/menus/:menu_id/menuItems", async (req, res) => {
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

router.get("/:id/menus/:menu_id/menuItems/:menuItem_id", async (req, res) => {
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
