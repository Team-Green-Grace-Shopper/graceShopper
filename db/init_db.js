// code to build and initialize DB goes here
// const {
//   client
//   // other db methods
// } = require('./index');

const { client } = require("./client");

const {
  dropTables,
  createTables,
  createInitialUsers,
  createInitialProducts,
  createInitialOrders,
} = require("./seedData");

async function buildTables() {
  try {
    client.connect();

    await dropTables();
    await createTables();
  } catch (error) {
    console.log("Error during buildTables");
    throw error;
  }
}

async function populateInitialData() {
  try {
    await createInitialUsers();
    await createInitialProducts();
    await createInitialOrders();
    //
  } catch (error) {
    console.log("Error during populateInitialData");
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
