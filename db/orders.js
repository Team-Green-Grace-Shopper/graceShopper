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

module.exports = {
  createOrder,
};
