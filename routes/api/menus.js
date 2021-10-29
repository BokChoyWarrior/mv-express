const express = require("express");
const router = express.Router();
const { Restaurant, Menu, MenuItem } = require("../../database/models");
const { Op } = require("sequelize");
const { respond404 } = require("./helperFunctions");

// Main route
router
  .route("/")

  .get(async (req, res) => {
    const menu = await Menu.findAll();

    res.json(menu);
  });

// Main CRUD route
router
  .route("/:id")

  .get(async (req, res) => {
    const menu = await Menu.findByPk(req.params.id);

    if (menu) {
      res.send(menu);
    } else {
      respond404(req, res, `Menu with ID ${req.params.id} doesn't exist`);
    }
  })

  .get(async (req, res) => {
    const menu = await Menu.findByPk(req.params.id);

    if (menu) {
      res.json(menu);
    } else {
      respond404(req, res);
    }
  })

  .put(async (req, res) => {
    const { title, restaurant_id } = req.body;
    const updated = await Menu.update(
      { title, restaurant_id },
      {
        where: {
          id: req.params.id,
        },
        limit: 1,
      }
    );

    if (updated[0] === 1) {
      respondSuccess(req, res, "Menu updated successfully");
    } else {
      respond400(
        req,
        res,
        "Resource cannot be updated becuase it does not exist"
      );
    }
  })

  .delete(async (req, res) => {
    const deleted = await Menu.destroy({
      where: {
        id: req.params.id,
      },
      limit: 1,
    });

    if (deleted === 1) {
      respondSuccess(req, res, "Menu deleted successfully");
    } else {
      respond400(
        req,
        res,
        "Resource cannot be deleted becuase it does not exist"
      );
    }
  });

// Nested routes
router.get("/:id/menuItems", async (req, res) => {
  let menu = Menu.findByPk(req.params.id);
  let menuItems = MenuItem.findAll({
    where: { menu_id: req.params.id },
  });

  [menu, menuItems] = await Promise.all([menu, menuItems]);

  if (!menu) {
    respond404(req, res, `Menu with ID ${req.params.id} doesn't exist`);
  }

  res.json(menuItems);
});

router.get("/:id/menuItems/:menuItem_id", async (req, res) => {
  let menu = Menu.findByPk(req.params.id);
  let menuItem = MenuItem.findOne({
    where: {
      [Op.and]: [{ menu_id: req.params.id }, { id: req.params.menuItem_id }],
    },
  });

  [menu, menuItem] = await Promise.all([menu, menuItem]);

  if (!menu) {
    respond404(req, res, `Menu with ID ${req.params.id} doesn't exist`);
  } else if (menuItem) {
    res.json(menuItem);
  } else {
    respond404(
      req,
      res,
      `Menu item ${req.params.menuItem_id} doesn't exist in the selected menu`
    );
  }
});

module.exports = router;
