const { Router } = require("express");
const productsRouter = Router();

//middleware
const checkIsAdmin = require("../middleware/checkIsAdmin");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../db");

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

//CREATE PRODUCT
productsRouter.post("/", checkIsAdmin, async (req, res, next) => {
  try {
    const { name, description, price, imageURL } = req.body;

    try {
      const createdProduct = await createProduct({
        name,
        description,
        price,
        imageURL,
      });

      res.status(201).send(createdProduct);
    } catch (error) {
      return next(error);
    }
  } catch (error) {}
});

//UPDATE PRODUCT
productsRouter.patch("/:productId", checkIsAdmin, async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { name, description, price, imageURL } = req.body;

    try {
      const updatedProduct = await updateProduct({
        productId,
        name,
        description,
        price,
        imageURL,
      });

      res.status(200).send(updatedProduct);
    } catch (error) {
      return next(error);
    }
  } catch (error) {}
});

//DELETE PRODUCT
productsRouter.delete("/:productId", checkIsAdmin, async (req, res, next) => {
  try {
    const { productId } = req.params;

    try {
      const deletedProduct = await deleteProduct(productId);

      res.status(200).send(deletedProduct);
    } catch (error) {
      return next(error);
    }
  } catch (error) {}
});

module.exports = productsRouter;
