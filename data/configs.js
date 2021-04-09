const knex = require("knex")
const dbEngine = process.env.DB_ENVIRONMENT || 'development'
const knexfile = require("../knexfile")[dbEngine]

module.exports = knex(knexfile)