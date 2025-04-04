const express = require('express');
const { body, validationResult } = require('express-validator');
const Category = require('../models/category');

const router = express.Router();

// Create a category
router.post('/', [
    body('name').notEmpty().withMessage('Category name is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const category = await Category.create({ name: req.body.name });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;