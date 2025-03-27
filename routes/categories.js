const express = require('express');
const { body, validationResult } = require('express-validator');
const Category = require('../models/category');

const router = express.Router();

router.post('/', [
    body('name').notEmpty().withMessage('Category name is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const category = await Category.create(req.body);
    res.status(201).json(category);
});

router.get('/', async (req, res) => {
    res.json(await Category.findAll());
});

module.exports = router;
