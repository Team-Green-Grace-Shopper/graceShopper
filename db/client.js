const { Client } = require("pg");
const client = new Client("postgress://localhost:5432/graceshopper");

//change
module.exports = { client };
