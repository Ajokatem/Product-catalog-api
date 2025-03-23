const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/product');

const router = express.Router();

// Create Product
router.post('/', [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
});

// Get Products with Pagination, Filtering, and Sorting
router.get('/', async (req, res) => {
    let { page = 1, limit = 10, category, sortBy = 'name', order = 'asc' } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let query = { deleted: false };
    if (category) query.category = category;

    const products = await Product.find(query)
        .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
        .skip((page - 1) * limit)
        .limit(limit);

    res.json({ total: await Product.countDocuments(query), products });
});

// Get Product by ID
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product || product.deleted) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// Update Product
router.patch('/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// Soft Delete Product
router.delete('/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(204).send();
});

// Inventory Management - Low Stock Reporting
router.get('/inventory/low-stock', async (req, res) => {
    const lowStockItems = await Product.find({ stock: { $lt: 5 }, deleted: false });
    res.json(lowStockItems);
});

// Search Functionality
router.get('/search', async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: 'Search query is required' });
    const results = await Product.find({
        deleted: false,
        $or: [
            { name: new RegExp(query, 'i') },
            { description: new RegExp(query, 'i') }
        ]
    });
    res.json(results);
});

module.exports = router;


