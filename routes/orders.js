const { Router } = require("express");

const { createOrder, checkoutCart } = require("../db");

const ordersRouter = Router();

//CREATE ORDER
// ordersRouter.patch("/update", async (req, res, next) => {
//   try {
//   } catch (error) {
//     return next(error);
//   }
// });

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
