const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.DataTypes.STRING,
    defaultValue:
      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/501.png',
  },
  price: {
    type: Sequelize.DataTypes.DECIMAL,
    validate: {
      isDecimal: true,
      min: 0,
    },
  },
  description: {
    type: Sequelize.DataTypes.TEXT,
  },
  product_category: {
    type: Sequelize.DataTypes.TEXT,
  },
  product_inventory: {
    type: Sequelize.DataTypes.INTEGER,
    validate: {
      isInt: true,
      min: 0,
    },
  },
});

module.exports = Product;
