const { Router } = require("express");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../db");

const productsRouter = Router();

//GET ALL PRODUCTS

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();

    res.status(200).send(products);
  } catch (error) {
    return next(error);
  }
});

//GET SINGLE PRODUCT BY ID
productsRouter.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await getProductById(productId);

    res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
});
