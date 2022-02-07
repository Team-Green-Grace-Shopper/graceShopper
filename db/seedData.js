const {
  createUser,
  createProduct,
  createOrder,
  createCartItem,
} = require("./");

const { client } = require("./client");

async function dropTables() {
  console.log("Dropping all tables...");

  try {
    await client.query(`
            DROP TABLE IF EXISTS "orderItems";
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
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        "isAdmin" BOOLEAN DEFAULT false
      );
      
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        "imageURL" TEXT
      );

      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id) NOT NULL,
        "orderType" VARCHAR(255) NOT NULL
      );

      CREATE TABLE "orderItems" (
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES orders(id) NOT NULL,
        "productId" INTEGER REFERENCES products(id) NOT NULL,
        quantity INTEGER NOT NULL,
        size VARCHAR(255),
        price INTEGER NOT NULL,
        "creationTime" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
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
    const adminsToCreate = [
      {
        email: "emily0@gmail.com",
        password: "emily0",
        isAdmin: true,
      },
      {
        email: "xavier1@gmail.com",
        password: "xavier1",
        isAdmin: true,
      },
      {
        email: "austin2@gmail.com",
        password: "austin2",
        isAdmin: true,
      },
    ];

    const usersToCreate = [
      {
        id: 4,
        email: "avgjoe2@gmail.com",
        password: "avgjoe2",
        isAdmin: false,
      },
    ];

    //promise.all the admins, ensure Joe is created 4th
    const admins = await Promise.all(adminsToCreate.map(createUser));
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Admins created: ");
    console.log(admins);
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
        description:
          "Sunshine in fabric form. This super-soft tee is made of 100% cotton and a perfect wardrobe staple.",
        price: 10,
        imageURL:
          "https://imgprd19.hobbylobby.com/9/5f/26/95f264323ae49e65b2a53a909fcd7d9ee659f3c7/350Wx350H-422519-0320.jpg",
      },
      {
        name: "basic t-shirt - stone",
        description:
          "Keep it simple. This super-soft tee is made of 100% cotton and a perfect wardrobe staple.",
        price: 10,
        imageURL:
          "https://imgprd19.hobbylobby.com/8/56/6d/8566d9f7459e9aca91040d45a7c3ae26b5ce499e/1400Wx1400H-633966-0320.jpg",
      },
      {
        name: "basic t-shirt - black",
        description:
          "For the dark-mode enthusiasts. This super-soft tee is made of 100% cotton and a perfect wardrobe staple.",
        price: 10,
        imageURL:
          "https://imgprd19.hobbylobby.com/2/fe/7f/2fe7f9b08fb17ea5bffd92cf575dee4a8d898668/350Wx350H-634485-0320.jpg",
      },
      {
        name: "basic t-shirt - yellow",
        description:
          "Sunshine in fabric form. This super-soft tee is made of 100% cotton and a perfect wardrobe staple.",
        price: 10,
        imageURL:
          "https://imgprd19.hobbylobby.com/9/5f/26/95f264323ae49e65b2a53a909fcd7d9ee659f3c7/350Wx350H-422519-0320.jpg",
      },
      {
        name: "basic t-shirt - stone",
        description:
          "Keep it simple. This super-soft tee is made of 100% cotton and a perfect wardrobe staple.",
        price: 10,
        imageURL:
          "https://imgprd19.hobbylobby.com/8/56/6d/8566d9f7459e9aca91040d45a7c3ae26b5ce499e/1400Wx1400H-633966-0320.jpg",
      },
      {
        name: "basic t-shirt - black",
        description:
          "For the dark-mode enthusiasts. This super-soft tee is made of 100% cotton and a perfect wardrobe staple.",
        price: 10,
        imageURL:
          "https://imgprd19.hobbylobby.com/2/fe/7f/2fe7f9b08fb17ea5bffd92cf575dee4a8d898668/350Wx350H-634485-0320.jpg",
      },
      {
        name: "basic t-shirt - yellow",
        description:
          "Sunshine in fabric form. This super-soft tee is made of 100% cotton and a perfect wardrobe staple.",
        price: 10,
        imageURL:
          "https://imgprd19.hobbylobby.com/9/5f/26/95f264323ae49e65b2a53a909fcd7d9ee659f3c7/350Wx350H-422519-0320.jpg",
      },
      {
        name: "basic t-shirt - stone",
        description:
          "Keep it simple. This super-soft tee is made of 100% cotton and a perfect wardrobe staple.",
        price: 10,
        imageURL:
          "https://imgprd19.hobbylobby.com/8/56/6d/8566d9f7459e9aca91040d45a7c3ae26b5ce499e/1400Wx1400H-633966-0320.jpg",
      },
      {
        name: "basic t-shirt - black",
        description:
          "For the dark-mode enthusiasts. This super-soft tee is made of 100% cotton and a perfect wardrobe staple.",
        price: 10,
        imageURL:
          "https://imgprd19.hobbylobby.com/2/fe/7f/2fe7f9b08fb17ea5bffd92cf575dee4a8d898668/350Wx350H-634485-0320.jpg",
      },
      {
        name: "basic t-shirt - yellow",
        description:
          "Sunshine in fabric form. This super-soft tee is made of 100% cotton and a perfect wardrobe staple.",
        price: 10,
        imageURL:
          "https://imgprd19.hobbylobby.com/9/5f/26/95f264323ae49e65b2a53a909fcd7d9ee659f3c7/350Wx350H-422519-0320.jpg",
      },
      {
        name: "basic t-shirt - stone",
        description:
          "Keep it simple. This super-soft tee is made of 100% cotton and a perfect wardrobe staple.",
        price: 10,
        imageURL:
          "https://imgprd19.hobbylobby.com/8/56/6d/8566d9f7459e9aca91040d45a7c3ae26b5ce499e/1400Wx1400H-633966-0320.jpg",
      },
      {
        name: "basic t-shirt - black",
        description:
          "For the dark-mode enthusiasts. This super-soft tee is made of 100% cotton and a perfect wardrobe staple.",
        price: 10,
        imageURL:
          "https://imgprd19.hobbylobby.com/2/fe/7f/2fe7f9b08fb17ea5bffd92cf575dee4a8d898668/350Wx350H-634485-0320.jpg",
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
        orderType: "order",
      },
      {
        userId: 4,
        orderType: "cart",
      },
      {
        userId: 1,
        orderType: "cart",
      },
      {
        userId: 2,
        orderType: "cart",
      },
      {
        userId: 3,
        orderType: "cart",
      },
    ];

    console.log("created orders to create");

    const orders = await Promise.all(ordersToCreate.map(createOrder));

    console.log("Orders created:");
    console.log(orders);
    console.log("Finished creating orders");
  } catch (error) {
    console.error("Error creating orders!");
    throw error;
  }
}

async function createInitialOrderItems() {
  try {
    console.log("Starting to create order items");

    const orderItemsToCreate = [
      {
        orderId: 1,
        productId: 2,
        quantity: 1,
        size: "S",
        price: 10,
      },
      {
        orderId: 1,
        productId: 3,
        quantity: 2,
        size: "S",
        price: 10,
      },
      {
        orderId: 1,
        productId: 1,
        quantity: 1,
        size: "M",
        price: 10,
      },
      {
        orderId: 2,
        productId: 1,
        quantity: 1,
        size: "S",
        price: 10,
      },
    ];

    const orderItems = await Promise.all(
      orderItemsToCreate.map(createCartItem)
    );

    console.log("Order items created:");
    console.log(orderItems);
    console.log("Finished creating order items!");
  } catch (error) {
    console.error("Error creating order items!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialOrders();
    await createInitialOrderItems();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
