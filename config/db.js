const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Connected');
    } catch (error) {
        console.error('MySQL connection error:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };

