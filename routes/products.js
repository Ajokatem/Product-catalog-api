const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const Product = require('../models/product');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Rate limiter - max 10 requests per 15 minutes per user
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10,
    message: { error: 'Too many requests. Please try again later.' }
});

// Create Product (Admin Only)
router.post('/', 
    authenticate, authorize(['admin']), 
    upload.single('image'),
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('price').isNumeric().withMessage('Price must be a number'),
        body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const newProduct = new Product({
            ...req.body,
            image: req.file ? req.file.path : null 
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    }
);

// Get Products with Pagination, Filtering, Sorting & Search
router.get('/', limiter, async (req, res) => {
    let { page = 1, limit = 10, category, search, minPrice, maxPrice, sortBy = 'name', order = 'asc' } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let query = { deleted: false };
    if (category) query.category = category;
    if (minPrice || maxPrice) query.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
    if (search) {
        query.$or = [
            { name: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') }
        ];
    }

    const products = await Product.find(query)
        .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
        .skip((page - 1) * limit)
        .limit(limit);

    res.json({ total: await Product.countDocuments(query), products });
});

// Get Product by ID
router.get('/:id', limiter, async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product || product.deleted) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// Update Product (Admin Only)
router.patch('/:id', authenticate, authorize(['admin']), async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// Soft Delete Product (Admin Only)
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(204).send();
});

// Inventory Management - Low Stock Reporting
router.get('/inventory/low-stock', authenticate, authorize(['admin']), async (req, res) => {
    const lowStockItems = await Product.find({ stock: { $lt: 5 }, deleted: false });
    res.json(lowStockItems);
});

// Search Functionality (Refined)
router.get('/search', limiter, async (req, res) => {
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
