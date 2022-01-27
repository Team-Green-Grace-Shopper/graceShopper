const { client } = require("./client");

async function createProduct({ name, description, price, imageURL }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products(name, description, price, "imageURL")
      VALUES($1,$2,$3,$4)
      RETURNING *; 
    `,
      [name, description, price, imageURL]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
      SELECT *
      FROM products;
      `
    );
    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductById(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT *
      FROM products
      WHERE id =$1;
      `,
      [productId]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(updateData) {
  try {
    let updateStr = Object.keys(updateData)
      .filter((key) => key !== "id")
      .map((key, index) => `"${key}" = $${index + 2}`)
      .join(", ");

    const {
      rows: [product],
    } = await client.query(
      `
      UPDATE products
      SET ${updateStr}
      WHERE id = $1
      RETURNING *;
      `,
      Object.values(updateData)
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      DELETE FROM products
      WHERE id = $1
      RETURNING *;
      `,
      [productId]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
