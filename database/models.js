const { sequelize, DataTypes, Model } = require("./sequelize_index");

class Restaurant extends Model {}

class Menu extends Model {}

class MenuItem extends Model {}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://i.imgur.com/VfpU1j0.jpeg",
    },
  },
  {
    tableName: "restaurants",
    sequelize,
    timestamps: false,
  }
);

Menu.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    restaurant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Restaurant,
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

MenuItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    menu_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Menu,
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

Restaurant.hasMany(Menu, {
  sourceKey: "id",
  foreignKey: "restaurant_id",
  as: "menus",
});

Menu.hasMany(MenuItem, {
  sourceKey: "id",
  foreignKey: "menu_id",
  as: "menuItems",
});

MenuItem.belongsTo(Menu, { foreignKey: "menu_id", as: "menu" });
Menu.belongsTo(Restaurant, { foreignKey: "restaurant_id", as: "restaurant" });

module.exports = { Restaurant, Menu, MenuItem };
