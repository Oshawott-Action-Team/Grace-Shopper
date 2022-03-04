const ordersRouter = require("express").Router();

const {
  models: { Order, User },
} = require("../db");

//GET /api/orders/users/:userId
//user's order history
ordersRouter.get("/complete/users/:userId", async (req, res, next) => {
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

ordersRouter.get("/new/users/:userId", async (req, res, next) => {
  try {
    const orders = await User.findByPk(req.params.userId, {
      include: {
        model: Order,
        where: {
          orderStatus: "new",
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

ordersRouter.post("/users/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const order = await Order.create(req.body);
    user.addOrder(order);
    res.status(201).send(order);
  } catch (err) {
    next(err);
  }
});
ordersRouter.put("/:orderId/users/:userId", async (req, res, next) => {
  try {
    //change the orderStatus and add security
    const order = await Order.findByPk(req.params.orderId);
    if (order) {
      if (order.userId.toString() === req.params.userId) {
        order.orderStatus = "completed";
        await order.save();
        res.send(order);
      } else {
        res.send(404);
      }
    } else {
      res.send(404);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = ordersRouter;
