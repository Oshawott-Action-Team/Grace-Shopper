const ordersRouter = require("express").Router();

const {
  models: { Order, User, Product },
} = require("../db");

// middleware to handle userId
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

//GET /api/orders/complete/ : get all completed orders of a user
ordersRouter.get("/complete", requireToken, async (req, res, next) => {
  try {
    const orders = await User.findByPk(req.user.id, {
      include: {
        model: Order,
        where: {
          orderStatus: "completed",
        },
        include: {
          model: Product,
        },
      },
    });
    res.send(orders.orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/new/ : get the active (new) order of a user
ordersRouter.get("/new", requireToken, async (req, res, next) => {
  try {
    const orders = await User.findByPk(req.user.id, {
      include: {
        model: Order,
        where: {
          orderStatus: "new",
        },
        include: {
          model: Product,
        },
      },
    });
    // const order = await Order.findByPk()
    res.send(orders.orders);
  } catch (err) {
    next(err);
  }
});

// POST /api/orders/ : create a new order if there were none in the database
ordersRouter.post("/", requireToken, async (req, res, next) => {
  try {
    const [order] = await Order.findOrCreate({
      where: { orderStatus: "new", userId: req.user.id },
    });
    res.status(201).send(order);
  } catch (err) {
    next(err);
  }
});

// PUT /api/orders/:orderId : update the status of an order from 'new' to 'completed'
ordersRouter.put("/:orderId", requireToken, async (req, res, next) => {
  try {
    // NEED UPDATE HERE WIP //
    const order = await Order.findByPk(req.params.orderId);
    if (order) {
      if (order.userId.toString() === req.user.id.toString()) {
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

ordersRouter.put(
  "/:orderId/products/:productId",
  requireToken,
  async (req, res, next) => {
    try {
      //
    } catch (err) {
      next(err);
    }
  }
);

ordersRouter.delete(
  "/:orderId/products/:productId",
  requireToken,
  async (req, res, next) => {
    try {
      //
    } catch (err) {
      next(err);
    }
  }
);

module.exports = ordersRouter;
