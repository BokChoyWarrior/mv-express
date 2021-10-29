const express = require("express");
const router = express.Router();
const { Restaurant, Menu, MenuItem } = require("../../database/models");
const { Op } = require("sequelize");
const { respond404, respond400, respondSuccess } = require("./helperFunctions");

// Main route
router
  .route("/")

  .get(async (req, res) => {
    const menu = await MenuItem.findAll();

    res.json(menu);
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
