const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/product');
const Variant = require('../models/variant');

const router = express.Router();

// Create a product
router.post('/products', [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a product
router.post('/', [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('categoryId').isInt().withMessage('Category ID must be an integer'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all products with optional pagination, filtering, and sorting
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'id', order = 'asc' } = req.query;

        const offset = (page - 1) * limit;
        const products = await Product.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [[sortBy, order.toUpperCase()]],
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a product by ID
router.patch('/:id', [
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await product.update(req.body);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Soft delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Soft delete the product (if `paranoid` is enabled in the model)
        await product.destroy();
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get low stock products
router.get('/inventory/low-stock', async (req, res) => {
    try {
        const lowStockThreshold = 5; // Define the threshold for low stock
        const lowStockProducts = await Product.findAll({
            where: {
                stock: { [require('sequelize').Op.lt]: lowStockThreshold }, // Stock less than threshold
            },
        });

        res.json(lowStockProducts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a variant to a product
router.post('/:id/variants', [
    body('name').notEmpty().withMessage('Variant name is required'),
    body('value').notEmpty().withMessage('Variant value is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const variant = await Variant.create({
            name: req.body.name,
            value: req.body.value,
            productId: product.id,
        });

        res.status(201).json(variant);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all variants for a product
router.get('/:id/variants', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: Variant, // Include associated variants
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product.Variants); // Return the associated variants
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;

