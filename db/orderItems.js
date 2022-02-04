const { client } = require("./client");

async function createCartItem({ orderId, productId, quantity, size, price }) {
  try {
    const {
      rows: [cartItem],
    } = await client.query(
      `
        INSERT INTO "orderItems" ("orderId", "productId", quantity, size, price)
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

async function updateCartItem(cartItemId, quantity) {
  try {
    const {
      rows: [cartItem],
    } = await client.query(
      `
      UPDATE "orderItems"
      SET quantity = $2
      WHERE id = $1
      `,
      [cartItemId, quantity]
    );

    return cartItem;
  } catch (error) {
    throw error;
  }
}

async function deleteCartItem(orderItemId) {
  try {
    const {
      rows: [cartItem],
    } = await client.query(
      `
      DELETE FROM "orderItems"
      WHERE id = $1
      RETURNING *;
      `,
      [orderItemId]
    );

    return cartItem;
  } catch (error) {
    throw error;
  }
}

async function getAllOrderItems(orderId) {
  try {
    const { rows: orderItems } = await client.query(
      `
      SELECT 
        "orderItems".id as "orderItemsId",
        name,
        "imageURL",
        "orderItems".price,
        size,
        quantity
      FROM "orderItems"
      JOIN products ON products.id = "orderItems"."productId"
      WHERE "orderId" = $1;
      `,
      [orderId]
    );

    return orderItems;
  } catch (error) {
    throw error;
  }
}

async function getCartByUser(userId) {
  try {
    const { rows: items } = await client.query(
      `
      SELECT 
        "orderItems".id as "orderItemsId",
        orders.id as "orderId",
        name,
        "imageURL",
        "orderItems".price,
        size,
        quantity
      FROM "orderItems"
      JOIN products ON products.id = "orderItems"."productId"
      JOIN orders on orders.id = "orderItems"."orderId"
      JOIN users ON users.id = orders."userId"
      WHERE "userId" = $1 AND "orderType" = 'cart'
      ORDER BY "creationTime" ASC;
      `,
      [userId]
    );

    return items;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCartItem,
  updateCartItem,
  deleteCartItem,
  getAllOrderItems,
  getCartByUser,
};
