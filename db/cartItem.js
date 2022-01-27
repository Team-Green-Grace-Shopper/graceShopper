const { client } = require("./client");

async function createCartItem({ orderId, productId, quantity, size, price }) {
  try {
    const {
      rows: [cartItem],
    } = await client.query(
      `
        INSERT INTO cart_item ("orderId", "productId", quantity, size, price)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `,
      [orderId, productId, quantity, size, price]
    );

    return cartItem;
  } catch (error) {
    throw error;
  }
}

async function updateCartItem(updateData) {
  try {
    let updateStr = Object.keys(updateData)
      .filter((key) => key !== "id")
      .map((key, index) => `"${key}" = $${index + 2}`)
      .join(", ");

    const {
      rows: [cartItem],
    } = await client.query(
      `
      UPDATE cart_item
      SET ${updateStr}
      WHERE id = $1
      `,
      Object.values(updateData)
    );

    return cartItem;
  } catch (error) {
    throw error;
  }
}

async function deleteCartItem(cartItemId) {
  try {
    const {
      rows: [cartItem],
    } = await client.query(
      `
      DELETE FROM cart_item
      WHERE id = $1
      RETURNING *;
      `,
      [cartItemId]
    );

    return cartItem;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCartItem,
  updateCartItem,
  deleteCartItem,
};