const productsRouter = require("express").Router();

const { Products } = require("../db");

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await Products.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

module.export = productsRouter;
