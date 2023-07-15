const fs = require('fs');

module.exports = {
  development: {
    username: 'sa',
    password: 'SenhaBraba123',
    database: 'WorkFlowAPI',
    host: 'localhost',
    dialect: 'mssql', 
    logging: console.log
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    host: process.env.DATABASE_IP,
    dialect: process.env.DATABASE_TYPE
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    host: process.env.DATABASE_IP,
    dialect: process.env.DATABASE_TYPE
  },
};