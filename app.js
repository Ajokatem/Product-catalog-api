const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/products', require('./routes/products'));
app.use('/categories', require('./routes/categories'));

// API Documentation Endpoint
app.get('/docs', (req, res) => {
    res.json({
        message: "Welcome to the Product Catalog API!",
        endpoints: {
            "GET /products": "Retrieve all products with pagination, filtering, and sorting",
            "POST /products": "Create a new product",
            "GET /products/:id": "Retrieve a product by ID",
            "PATCH /products/:id": "Update a product partially",
            "DELETE /products/:id": "Soft delete a product",
            "GET /categories": "Retrieve all categories",
            "POST /categories": "Create a new category",
            "GET /search": "Search for products by name or description",
            "GET /inventory/low-stock": "Retrieve products with low stock"
        }
    });
});

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;

