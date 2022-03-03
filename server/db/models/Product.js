const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.DataTypes.TEXT,
    defaultValue:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/full/501.png",
  },
  price: {
    type: Sequelize.DataTypes.DECIMAL(10, 2),
    validate: {
      isDecimal: true,
      min: 0,
    },
  },
  description: {
    type: Sequelize.DataTypes.TEXT,
  },
});

module.exports = Product;
