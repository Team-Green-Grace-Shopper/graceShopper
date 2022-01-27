//create API router
const apiRouter = require("express").Router();

//importing routes
const usersRouter = require("./users");
const productsRouter = require("./products");
const ordersRouter = require("./orders");
const cartItemRouter = require("./cartItem");

apiRouter.get("/health", (req, res, next) => {
  res.send({
    message: "API router is working!",
  });
});

//users routes
apiRouter.use("/users", usersRouter);

//products routes
apiRouter.use("/products", productsRouter);

//orders routes
apiRouter.use("/orders", ordersRouter);

//cart item routes
apiRouter.use("/cartItem", cartItemRouter);

apiRouter.use((error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

module.exports = apiRouter;
