const { client } = require("./client");

async function createAddress({ userId, type, address, city, state, zip }) {
  try {
    const {
      rows: [newAddress],
    } = await client.query(
      `
      INSERT INTO addresses ("userId", type, address, city, state, zip)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `,
      [userId, type, address, city, state, zip]
    );

    return newAddress;
  } catch (error) {
    throw error;
  }
}

async function getShippingAddressByUser(userId) {
  try {
    const {
      rows: [shippingAddress],
    } = await client.query(
      `
        SELECT *
        FROM addresses
        WHERE "userId" = $1
        AND type = 'shipping';
        `,
      [userId]
    );

    return shippingAddress;
  } catch (error) {
    throw error;
  }
}

async function getBillingAddressByUser(userId) {
  try {
    const {
      rows: [shippingAddress],
    } = await client.query(
      `
            SELECT *
            FROM addresses
            WHERE "userId" = $1
            AND type = 'billing';
            `,
      [userId]
    );

    return shippingAddress;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createAddress,
  getShippingAddressByUser,
  getBillingAddressByUser,
};
