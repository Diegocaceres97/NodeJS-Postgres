const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    URI: URI,
    dialect: 'postgres',
    username: 'nico',
    password: config.dbPassword,
    database: config.dbName,
    host: config.dbHost,
    port: config.dbPort
  },
  production: {
    url: URI,
    dialect: 'postgres'
  }
}
