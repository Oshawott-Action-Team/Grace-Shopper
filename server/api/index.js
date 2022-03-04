const router = require('express').Router();

const productsRouter = require('./products');

router.use('/users', require('./users'));
router.use('/products', productsRouter);

router.use('/orders', require('./orders'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
