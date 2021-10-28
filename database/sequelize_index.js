const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "./database/restaurants-seq.sqlite",
});

module.exports = { sequelize, DataTypes, Model };
