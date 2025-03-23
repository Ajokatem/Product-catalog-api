const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: String,
    stock: { type: Number, required: true, min: 0 },
    variants: [String],
    discount: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Product', productSchema);


