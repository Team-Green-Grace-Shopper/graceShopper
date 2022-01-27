const { client } = require("./client");

async function createOrder({ userId, orderType }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO orders("userId", "orderType")
      VALUES($1,$2)
      RETURNING *; 
    `,
      [userId, orderType]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

//getCartByUser
//for logged in users to get cart
// params: userid

// sql:
// select *
// from orders
// where type = cart && userid = $1

// [userid]

// returning all (id, cart item objs)
// cart item obj: {id, product id, name, desc, imageurl, price, size, quantity}

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
  createOrder,
  checkoutCart,
};
