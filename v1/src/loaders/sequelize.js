const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '123123',
  database: 'AppleRepair',
  logging: false,
});

module.exports = sequelize;