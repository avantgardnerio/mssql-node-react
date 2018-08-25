const knex = require('knex')

const config = {
  client: 'mssql',
  connection: {
    host: process.env.MSSQL_SERVER || '127.0.0.1',
    user: process.env.MSSQL_USERNAME || 'admin',
    password: process.env.MSSQL_PASSWORD || 'password',
    database: process.env.MSSQL_DATABASE || 'db',
    options: {
      encrypt: true
    }
  }
}

module.exports = knex(config)
