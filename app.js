const express = require('express');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/categories', categoryRoutes); // Register categories route
app.use('/products', productRoutes);    // Register products route

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Product Catalog API!');
});

module.exports = app;