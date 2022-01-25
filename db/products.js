const {client} = require ('./client')

async function createProduct({name, description, price, imageURL}) {
  try {
    const {rows: [product]} = await client.query(`
      INSERT INTO products(name, description, price, "imageURL")
      VALUES($1,$2,$3,$4)
      RETURN *; 
    `,[name, description, price, imageURL]);
    
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct
}