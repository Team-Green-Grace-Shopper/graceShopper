//create API router
const express = require("express");
const apiRouter = express.Router();

//middleware
const getUserFromHeaders = require("../middleware/getUserFromHeaders");
apiRouter.use(getUserFromHeaders);

//importing routes
const usersRouter = require("./users");
const productsRouter = require("./products");
const ordersRouter = require("./orders");
const orderItemsRouter = require("./orderItems");

apiRouter.get("/health", (req, res, next) => {
  res.send({
    message: "API router is working!",
  });
});

// //users routes
apiRouter.use("/users", usersRouter);

//products routes
apiRouter.use("/products", productsRouter);

// //orders routes
apiRouter.use("/orders", ordersRouter);

// //order items routes
apiRouter.use("/orderItems", orderItemsRouter);

apiRouter.use((error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

module.exports = apiRouter;
