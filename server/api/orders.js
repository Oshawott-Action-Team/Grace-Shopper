const ordersRouter = require("express").Router();

const {
  models: { Order, User },
} = require("../db");

//GET /api/orders/users/:userId
//user's order history
ordersRouter.get("/users/:userId", async (req, res, next) => {
  try {
    const orders = await User.findByPk(req.params.userId, {
      include: {
        model: Order,
        where: {
          orderStatus: "completed",
        },
      },
    });
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

//POST /api/orders/:orderId/users/:userId
//modify the status of an order AKA checkout
ordersRouter.put("/:orderId/users/:userId", async (req, res, next) => {
  try {
    //change the orderStatus and add security
  } catch (err) {
    next(err);
  }
});

//GET /api/orders/:orderId
//look at cart for new/active order OR to look at individual previous order

//POST /api/orders/:orderId
// step 1: create an order (user has clicked "add to cart" for first time)
// step 2: update an order with the product
//to create a new order -> using magic methods -> order.addProduct(req.body)
//only happens when the OrderItem is currently empty
