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

//emily todo
async function getCartByUser(userId) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      SELECT *
      FROM orders
      WHERE "orderType" = "cart"
        AND id = $1;
      `,
      [userId]
    );

    // returning all (id, cart item objs)
    // cart item obj: {id, product id, name, desc, imageurl, price, size, quantity}

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

module.exports = {
  createCart,
  getCartByUser,
  checkoutCart,
};
