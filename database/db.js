require('dotenv').config()
let host = process.env.DB_HOST || 'localhost';
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : host,
      user : 'postgres',
      password : 'docker',
      database : 'reviews'
    }
})
module.exports = knex
