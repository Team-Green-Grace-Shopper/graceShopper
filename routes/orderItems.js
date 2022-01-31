const { Router } = require("express");
const orderItemsRouter = Router();

const {
  createCartItem,
  updateCartItem,
  deleteCartItem,
  getAllOrderItems,
} = require("../db");

//CREATE CART ITEM
orderItemsRouter.post("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;

    const createdItem = await createCartItem(productId);
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

    const editedItem = await updateCartItem(orderItemId);
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

module.exports = orderItemsRouter;
