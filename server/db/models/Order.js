const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
  },
  orderStatus: {
    type: Sequelize.ENUM(true, false),
    defaultValue: false,
  },
});

module.exports = Order;
