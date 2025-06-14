const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(
    process.env.DB_NAME || 'jobpulse',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'Hyd@1234',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = { sequelize, Sequelize };
