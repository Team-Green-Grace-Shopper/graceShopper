const {client} = require ('./client')

async function createUser({username, password, isAdmin}) {
  try {
    const {rows: [user]} = await client.query(`
      INSERT INTO users(username, password, "isAdmin")
      VALUES($1,$2,$3)
      RETURN *; 
    `,[username, password, isAdmin]);
    delete user.password
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser
}