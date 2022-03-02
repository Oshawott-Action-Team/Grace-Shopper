const productsRouter = require("express").Router();

const {
  models: { Product },
} = require("../db");

//get /api/products
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

//get /api/products/:id
productsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
