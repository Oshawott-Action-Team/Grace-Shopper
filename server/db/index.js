//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");

//associations could go here!
Product.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Product, { through: OrderItem });

Order.belongsTo(User);
User.hasMany(Order);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderItem,
  },
};
