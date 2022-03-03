const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  orderStatus: {
    type: Sequelize.ENUM("new", "completed"),
    defaultValue: "new",
  },
});

module.exports = Order;
