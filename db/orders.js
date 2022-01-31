const { client } = require("./client");

async function createCart({ userId, orderType }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      INSERT INTO orders ("userId", "orderType")
      VALUES ($1, $2)
      RETURNING *; 
    `,
      [userId, orderType]
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

async function checkoutCart(orderId) {
  try {
    const { rows: order } = await client.query(
      `
      UPDATE orders
      SET "orderType" = order
      WHERE id = $1
      RETURNING *;
      `,
      [orderId]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllOrdersByUserId(userId) {
  try {
    const { rows: orders } = await client.query(
      `
      SELECT id as "orderId", "orderType"
      FROM orders
      WHERE "userId" = $1;
      `,
      [userId]
    );

    return orders;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCart,
  checkoutCart,
  getAllOrdersByUserId,
};
