const { Router } = require("express");
const orderItemsRouter = Router();

const {
  createCartItem,
  updateCartItem,
  deleteCartItem,
  getAllOrderItems,
  getCartByUser,
} = require("../db");

//CREATE CART ITEM
orderItemsRouter.post("/create", async (req, res, next) => {
  try {
    const orderItemObj = req.body;

    const createdItem = await createCartItem(orderItemObj);
    res.status(200).send(createdItem);
  } catch (error) {
    return next(error);
  }
});

//UPDATE CART ITEM
orderItemsRouter.patch("/:orderItemId", async (req, res, next) => {
  try {
    //CHECK IF CART, DO NOT LET ORDERS BE EDITED
    // if (orderType === "order") {
    //   next()
    // }
    const { orderItemId } = req.params;

    const quantity = req.body.quantity;

    const editedItem = await updateCartItem(orderItemId, quantity);
    res.status(200).send(editedItem);
  } catch (error) {
    return next(error);
  }
});

//DELETE CART ITEM
orderItemsRouter.delete("/:orderItemId", async (req, res, next) => {
  try {
    //CHECK IF CART, DO NOT LET ORDERS BE DELETED
    // if (orderType === "order") {
    //   next()
    // }

    const { orderItemId } = req.params;

    const deletedItem = await deleteCartItem(orderItemId);
    res.status(200).send(deletedItem);
  } catch (error) {
    return next(error);
  }
});

//GET ALL ORDER ITEMS
orderItemsRouter.get("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const orderItems = await getAllOrderItems(orderId);
    res.status(200).send(orderItems);
  } catch (error) {
    return next(error);
  }
});

//GET CART BY USER
orderItemsRouter.get("/cart/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    const cartItems = await getCartByUser(userId);
    res.status(200).send(cartItems);
  } catch (error) {
    return next(error);
  }
});

module.exports = orderItemsRouter;
