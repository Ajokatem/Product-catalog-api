const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();
app.use(express.json());
connectDB();

app.use('/products', require('./routes/products'));
app.use('/categories', require('./routes/categories'));

app.get('/docs', (req, res) => {
    res.json({ message: "Welcome to the Product Catalog API!" });
});

app.use(errorHandler);

sequelize.sync();

module.exports = app;
