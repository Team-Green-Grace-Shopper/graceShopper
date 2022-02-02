const { Router } = require("express");

const { checkoutCart, getAllOrdersByUserId } = require("../db");

const ordersRouter = Router();

//CHECKOUT CART
ordersRouter.patch("/checkout", async (req, res, next) => {
  try {
    const { orderId } = req.body;

    const cart = await checkoutCart(orderId);
    res.status(200).send(cart);
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
