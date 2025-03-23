const express = require('express');
const { body, validationResult } = require('express-validator');
const Category = require('../models/category');

const router = express.Router();

// Create Category
router.post('/', [
    body('name').notEmpty().withMessage('Category name is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
});

// Get Categories
router.get('/', async (req, res) => {
    res.json(await Category.find());
});

module.exports = router;
