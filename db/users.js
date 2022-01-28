const { client } = require("./client");
const bcrypt = require("bcrypt");

async function createUser({ email, password, isAdmin }) {
  //if we were to store salt count in .env file:
  // const saltCount = Number.parseInt(process.env.SALT_COUNT);

  const SALT_COUNT = 15;

  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users (email, password, "isAdmin")
      VALUES($1, $2, $3)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email; 
    `,
      [email, hashedPassword, isAdmin]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ email, password }) {
  try {
    //email validation
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      throw new Error("User does not exist");
    }

    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, email, password
      FROM users
      WHERE email = $1;
      `,
      [email]
    );

    const result = await bcrypt.compare(password, user.password);

    if (user && result) {
      delete user.password;
      return user;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * 
      FROM users
      WHERE email = $1;
      `,
      [email]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

//emily todo
async function getAllUsers() {
  // userID, email, orderID, cartItems
  //each cart item has: id, productId, name, imageURL, price, size, quantity

  //-----

  //users table: user id, email
  //order table: order id

  //cart item table: id, productid, price, size, quantity
  //product table: name, imageurl,

  try {
    const {
      rows: [users],
    } = await client.query(
      `
      SELECT
        users.id,
        email,
        orders.id,
        products.id,
        name,
        "imageURL",
        cart_item.price,
        size,
        quantity
      FROM users
      JOIN orders ON orders."userId" = users.id 
      JOIN cart_item ON cart_item."orderId" = orders.id
      JOIN products ON products.id = cart_item."productId";
      `
    );

    console.log("users: ", users);
    return users;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createUser,
  getUser,
  getUserByEmail,
  getAllUsers,
};
