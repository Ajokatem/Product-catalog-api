const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/product');

const router = express.Router();

router.post('/proucts', [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const product = await Product.create(req.body);
    res.status(201).json(product);
});

router.get('/products', async (req, res) => {
    const products = await Product.findAll({ where: { deleted: false } });
    res.json(products);
});

router.get('/products:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product || product.deleted) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

router.patch('/products:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.update(req.body);
    res.json(product);
});

router.delete('/products:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.update({ deleted: true });
    res.status(204).send();
});

module.exports = router;


