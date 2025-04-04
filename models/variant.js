const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./product');

const Variant = sequelize.define('Variant', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id',
        },
    },
}, {
    timestamps: true,
});

// Define the relationship
Variant.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Variant;