const {Client} = require('pg')
const client = new Client(process.env.DATABASE_URL || 'postgress://localhost:5432/graceshopper')

//change
module.exports = {client}