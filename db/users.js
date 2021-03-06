const { client } = require("./client");
const bcrypt = require("bcrypt");

const { getAllOrdersByUserId } = require("./orders");
const { getAllOrderItems } = require("./orderItems");

async function createUser({ email, password, isAdmin }) {
  //email validation
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error(
      "A user with this email address has already registered with us."
    );
  }

  //if we were to store salt count in .env file:
  //const saltCount = Number.parseInt(process.env.SALT_COUNT);
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
      RETURNING id, email, "isAdmin"; 
    `,
      [email, hashedPassword, isAdmin]
    );

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function createGuest(email, isAdmin) {
  try {
    const {
      rows: [guest],
    } = await client.query(
      `
      INSERT INTO users (email, "isAdmin")
      VALUES ($1, $2)
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
      `,
      [email, isAdmin]
    );

    return guest;
  } catch (error) {
    throw error;
  }
}

async function getUser({ email, password }) {
  try {
    //email validation
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      throw new Error("Unregisted email, please sign-up.");
    }

    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, email, password, "isAdmin"
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
      SELECT id, email, "isAdmin" 
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

async function getAllUserInfo() {
  console.log("Getting all user info!----");
  try {
    const users = await _getAllUsers();

    for (let i = 0; i < users.length; i++) {
      let user = users[i];

      const orders = await getAllOrdersByUserId(user.userId);

      if (orders.length) {
        for (let k = 0; k < orders.length; k++) {
          const order = orders[k];

          const items = await getAllOrderItems(order.orderId);

          if (items.length) {
            order.items = items;
          }
        }

        user.orders = orders;
      }
    }

    return { users: users };
  } catch (error) {
    console.error(error);
  }
}

//helper function, for internal use
async function _getAllUsers() {
  try {
    const { rows: users } = await client.query(
      `
      SELECT id as "userId", email
      FROM users;
      `
    );

    return users;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createUser,
  createGuest,
  getUser,
  getUserByEmail,
  _getAllUsers,
  getAllUserInfo,
};
