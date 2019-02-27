const Sequelize = require('sequelize');
const localDBname = "postgres://localhost:5432/MyDatabase"
let db = null

if (process.env.SQL_INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
  let config = {
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    host: `/cloudsql/${process.env.SQL_INSTANCE_CONNECTION_NAME}`,
    dialect: `postgres`
  };
  db = new Sequelize(config)
} else {
  db = new Sequelize(process.env.DATABASE_URL || localDBname, { logging: false })
}

module.exports = {
  db,
  Sequelize
}
