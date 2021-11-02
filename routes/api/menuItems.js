const express = require("express");
const router = express.Router();
const { Restaurant, Menu, MenuItem } = require("../../database/models");
const { Op } = require("sequelize");
const { respond404, respond400, respondSuccess } = require("./helperFunctions");

// Main route
router
  .route("/")

  .get(async (req, res) => {
    let { sort = "id", order = "asc", limit = -1, menu_id = -1 } = req.query;

    let menuItems;
    let success = true;
    try {
      let menuQuery = {};
      menu_id = parseInt(menu_id);
      console.log(typeof menu_id);
      if (menu_id > -1) {
        menuQuery = { menu_id: menu_id };
      }

      menuItems = await MenuItem.findAll({
        order: [[sort, order]],
        limit: limit,
        where: menuQuery,
      });
    } catch (e) {
      console.log(e);
      respond404(req, res, "Please check queries");
      success = false;
    }
    // only runs if there was no error
    if (success) {
      res.json(menuItems);
    }
  })

  .post(async (req, res) => {
    try {
      const { name, price, menu_id } = req.body;

      const menu = await Menu.findByPk(menu_id);
      let menuItem;
      if (!!menu) {
        menuItem = await menu.createMenuItem({ name, price });
      } else {
        throw new Error(`Restaurant with ID: ${menu_id} doesn't exist`);
      }
      res.status(201).json(menuItem);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });

// Main CRUD route
router
  .route("/:id")

  .get(async (req, res) => {
    const menuItem = await MenuItem.findByPk(req.params.id);

    if (menuItem) {
      res.json(menuItem);
    } else {
      respond404(req, res);
    }
  })

  .put(async (req, res) => {
    const { name, price, menu_id } = req.body;
    const updated = await MenuItem.update(
      { name, price, menu_id },
      {
        where: {
          id: req.params.id,
        },
        limit: 1,
      }
    );

    if (updated[0] === 1) {
      respondSuccess(req, res, "Menu Item updated successfully");
    } else {
      respond400(
        req,
        res,
        "Resource cannot be updated becuase it does not exist"
      );
    }
  })

  .delete(async (req, res) => {
    const deleted = await MenuItem.destroy({
      where: {
        id: req.params.id,
      },
      limit: 1,
    });

    if (deleted === 1) {
      respondSuccess(req, res, "Menu Item deleted successfully");
    } else {
      respond400(
        req,
        res,
        "Resource cannot be deleted becuase it does not exist"
      );
    }
  });
module.exports = router;
