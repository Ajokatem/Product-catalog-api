const sequelize = require('./db');
const Category = require('../models/category');
const Product = require('../models/product');
const Variant = require('../models/variant'); 

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        // Sync models with the database
        await sequelize.sync({ force: true }); // Use { force: true } only for development
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        await sequelize.close();
    }
})();