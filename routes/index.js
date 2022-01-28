//create API router
const express = require("express");
const apiRouter = express.Router();

//importing routes
// const usersRouter = require("./users");
const productsRouter = require("./products");
// const ordersRouter = require("./orders");
// const cartItemRouter = require("./cartItem");

apiRouter.get("/health", (req, res, next) => {
  res.send({
    message: "API router is working!",
  });
});

// //users routes
// router.use("/users", usersRouter);

//products routes
apiRouter.use("/products", productsRouter);

// //orders routes
// router.use("/orders", ordersRouter);

// //order items routes
// router.use("/orderItems", orderItemsRouter);

apiRouter.use((error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

module.exports = apiRouter;
