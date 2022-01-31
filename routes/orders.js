const { Router } = require("express");

const { checkoutCart, getAllOrdersByUserId } = require("../db");

const ordersRouter = Router();

//CHECKOUT CART
ordersRouter.patch("/checkout", async (req, res, next) => {
  try {
    const { id } = req.body;

    const order = await checkoutCart(id);
    res.status(200).send(order);
  } catch (error) {
    return next(error);
  }
});

//GET ALL ORDERS BY UID
ordersRouter.get("/:userId", async (req, res, next) => {
  console.log("inside orders by uid route---");
  try {
    const { userId } = req.params;
    const allOrders = await getAllOrdersByUserId(userId);

    res.status(200).send(allOrders);
  } catch (error) {
    return next(error);
  }
});

module.exports = ordersRouter;
