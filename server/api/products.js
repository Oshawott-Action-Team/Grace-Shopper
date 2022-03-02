const productsRouter = require("express").Router();

const {
  models: { Product },
} = require("../db");

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

module.exports = productsRouter;
