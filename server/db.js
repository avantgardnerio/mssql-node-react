const knex = require('knex')

const config = {
  client: 'mssql',
  connection: {
    host: process.env.MSSQL_SERVER || '127.0.0.1',
    user: process.env.MSSQL_USERNAME || 'sa',
    password: process.env.MSSQL_PASSWORD || 'Password!',
    database: process.env.MSSQL_DATABASE || 'tempdb',
    options: {
      encrypt: true
    }
  }
}

module.exports = knex(config)
