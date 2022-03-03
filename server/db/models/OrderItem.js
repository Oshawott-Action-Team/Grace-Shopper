const Sequelize = require("sequelize");
const db = require("../db");

const OrderItem = db.define("orderItem", {
  quantity: {
    type: Sequelize.INTEGER,
  },
  salesPrice: {
    type: Sequelize.DECIMAL(10, 2),
  },
});

module.exports = OrderItem;
