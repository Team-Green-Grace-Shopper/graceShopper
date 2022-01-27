const { createUser, createProduct, createOrder } = require("./");

const { client } = require("./client");

async function dropTables() {
  console.log("Dropping all tables...");

  try {
    await client.query(`
            DROP TABLE IF EXISTS cart_item;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS users;
        `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

async function createTables() {
  console.log("Starting to build tables...");

  try {
    await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                "isAdmin" BOOLEAN DEFAULT false
            );
            
            CREATE TABLE products(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                description TEXT NOT NULL,
                price INTEGER NOT NULL,
                "imageURL" TEXT
            );

            CREATE TABLE orders(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                "orderType" VARCHAR(255)
            );

            CREATE TABLE cart_item(
                id SERIAL PRIMARY KEY,
                "orderId" INTEGER REFERENCES orders(id) NOT NULL,
                "productId" INTEGER REFERENCES products(id) NOT NULL,
                quantity INTEGER NOT NULL,
                size VARCHAR(255),
                price INTEGER 
            );

        `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

//SEED DATA BELOW
async function createInitialUsers() {
  console.log("Starting to create users...");

  try {
    const userToCreate = [
      {
        email: "emily38@gmail.com",
        password: "emily0",
        isAdmin: true,
        // address: "123 street",
      },
      {
        email: "abc123@gmail.com",
        password: "xavier1",
        isAdmin: true,
        // address: "345 street",
      },
      {
        email: "def456@gmail.com",
        password: "austin2",
        isAdmin: true,
        // address: "567 street",
      },
      {
        email: "avgavgjoe@gmail.com",
        password: "avgjoe2",
        isAdmin: false,
        // address: "789 street",
      },
    ];

    const users = await Promise.all(userToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users.");
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("Starting to create products");

    const productsToCreate = [
      {
        name: "basic t-shirt - yellow",
        description: "it is a t-shirt",
        price: 10,
        imageURL: "shorturl.at/myNY1",
      },
      {
        name: "basic t-shirt - pink",
        description: "it is a t-shirt",
        price: 10,
        imageURL: "shorturl.at/myNY1",
      },
      {
        name: "basic t-shirt - black",
        description: "it is a t-shirt",
        price: 10,
        imageURL: "shorturl.at/myNY1",
      },
    ];

    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log("Products created:");
    console.log(products);
    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating products!");
    throw error;
  }
}

async function createInitialOrders() {
  try {
    console.log("Starting to create orders");

    const ordersToCreate = [
      {
        userId: 4,
        orderType: "cart",
      },
      {
        userId: "4",
        orderType: "order",
      },
    ];

    const orders = await Promise.all(ordersToCreate.map(createOrder));

    console.log("Orders created:");
    console.log(orders);
    console.log("Finished creating orders");
  } catch (error) {
    console.error("Error creating orders!");
    throw error;
  }
}

// async function createInitialCartItems() {}

module.exports = {
  dropTables,
  createTables,
  createInitialUsers,
  createInitialProducts,
  createInitialOrders,
};
