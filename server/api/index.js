const router = require("express").Router();
module.exports = router;
const productsRouter = require("./products");

router.use("/users", require("./users"));
router.use("/products", productsRouter);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
