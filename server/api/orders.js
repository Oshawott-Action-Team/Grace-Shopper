const ordersRouter = require("express").Router();
const requireToken = require("./tokenAuth");

const {
  models: { Order, User, Product },
} = require("../db");

//GET /api/orders/complete/ : get all completed orders of a user
ordersRouter.get("/complete", requireToken, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id, orderStatus: "completed" },
      attributes: ["id", "orderStatus", "userId"],
    });
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/new/ : get the active (new) order of a user
ordersRouter.get("/new", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: { userId: req.user.id, orderStatus: "new" },
      attributes: ["id", "orderStatus", "userId"],
      include: {
        model: Product,
        attributes: ["id", "name", "imageUrl"],
        through: { attributes: ["quantity", "salesPrice"] },
      },
    });
    res.send(order);
  } catch (err) {
    next(err);
  }
});

// PUT /api/orders/orderItem : update the status of an order from 'new' to 'completed'
ordersRouter.put("/orderItem", requireToken, async (req, res, next) => {
  try {
    // NEED UPDATE HERE WIP //
    const order = await Order.findByPk(req.body.id);
    if (order) {
      if (order.userId.toString() === req.user.id.toString()) {
        order.orderStatus = "completed";
        await order.save();
        res.send([]);
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

// PUT /api/orders : add a product item into a new order of a user
// (whether it is an existed or newly added order)
ordersRouter.put("/", requireToken, async (req, res, next) => {
  try {
    const [order] = await Order.findOrCreate({
      where: { orderStatus: "new", userId: req.user.id },
    });

    await order.addProducts(req.body.id, {
      through: { quantity: req.body.quantity, salesPrice: req.body.salesPrice },
    });
    res.send(
      await Order.findByPk(order.id, {
        attributes: ["id", "orderStatus", "userId"],
        include: {
          model: Product,
          attributes: ["id", "name", "imageUrl"],
          through: { attributes: ["quantity", "salesPrice"] },
        },
      })
    );
  } catch (err) {
    next(err);
  }
});

// DELETE /api/orders : remove a product item from an order
ordersRouter.delete("/", requireToken, async (req, res, next) => {
  try {
    const [order] = await Order.findAll({
      where: { userId: req.user.id, orderStatus: "new" },
      attributes: ["id", "orderStatus", "userId"],
      include: {
        model: Product,
        attributes: ["id", "name", "imageUrl"],
        through: { attributes: ["quantity", "salesPrice"] },
      },
    });
    await order.removeProducts(req.body.id);
    res.send(
      await Order.findAll({
        where: { userId: req.user.id, orderStatus: "new" },
        attributes: ["id", "orderStatus", "userId"],
        include: {
          model: Product,
          attributes: ["id", "name", "imageUrl"],
          through: { attributes: ["quantity", "salesPrice"] },
        },
      })
    );
  } catch (err) {
    next(err);
  }
});

module.exports = ordersRouter;
