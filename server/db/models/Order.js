const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
  },
  orderStatus: {
    type: Sequelize.ENUM("new", "completed"),
    defaultValue: "new",
  },
});

module.exports = Order;
