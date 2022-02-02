const { Router } = require("express");

const {
  checkoutCart,
  getAllOrdersByUserId,
  getCartIdByUserId,
} = require("../db");

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
  try {
    const { userId } = req.params;
    const allOrders = await getAllOrdersByUserId(userId);

    res.status(200).send(allOrders);
  } catch (error) {
    return next(error);
  }
});

//GET CART ID BY UID
ordersRouter.get("/cartId/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cartId = await getCartIdByUserId(userId);

    res.status(200).send(cartId);
  } catch (error) {
    return next(error);
  }
});

module.exports = ordersRouter;
