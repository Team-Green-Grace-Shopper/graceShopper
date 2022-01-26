const { client } = require("./client");

async function createUser({ email, password, isAdmin }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(email, password, "isAdmin")
      VALUES($1,$2,$3)
      RETURNING *; 
    `,
      [email, password, isAdmin]
    );
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
};
