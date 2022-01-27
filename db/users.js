const { client } = require("./client");
const bcrypt = require('bcrypt');

async function createUser({ email, password, isAdmin }) {
  
  const SALT_COUNT = 15;
  let pwHASH = await bcrypt.hash(password, SALT_COUNT);

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(email, password, "isAdmin")
      VALUES($1,$2,$3)
      ON CONFLICT (email) DO NOTHING
      RETURNING email; 
    `,
      [email, pwHASH, isAdmin]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({email, password}){
  
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
    
    const result = await bcrypt.compare(password, user.password);

    if (user && result) {
      delete user.password
      return user
    } else {
      return false
    }

  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email){
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
// userID, email, orderID, cartItems, 

/* async function getAllUsers(){
  try {
    const{
      rows: [users],
    } = await client.query(
      `
      SELECT * 
      FROM users;
      `
    );
    return users;
  } catch (error) {
    
  }
} */

module.exports = {
  createUser, getUser
};
