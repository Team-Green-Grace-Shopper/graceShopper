const { Router } = require("express");

const {
  createCartItem,
  updateCartItem,
  deleteCartItem,
} = require ("../db")
  
const cartItemsRouter = Router();

//CREATE CART ITEM
cartItemsRouter.post("/create", async(req, res, next) => {
  const { orderId, productId, quantity, size, price } = req.body

  try {
    const createdCartItem = await createCartItem({ orderId, productId, quantity, size, price })

    res.status(201).json({ cartItem: createdCartItem })
  } catch (error) {
    return next(error);
  }
})

//UPDATE CART ITEM
cartItemsRouter.patch("/update/:orderId", async(req, res, next) => {
  const id = req.params
  const { orderId, productId, quantity, size, price } = req.body

  try {
    const updatedCartItem = await updateCartItem({ id, orderId, productId, quantity, size, price})

    res.status(200).json({ cartItem: updatedCartItem })
  } catch (error) {
    return next(error);
  }
})

//DELETE CART ITEM
cartItemsRouter.delete("/delete/:orderId", async(req, res, next) => {
  const id = req.params
  
  try {
    const deletedCartItem = await deleteCartItem(id)

    res.status(200).send(deletedCartItem)
  } catch (error) {
    return next(error);
  }

})