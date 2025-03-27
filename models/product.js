const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./category');

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.STRING,
    price: { type: DataTypes.FLOAT, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, references: { model: Category, key: 'id' } },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    variants: { type: DataTypes.JSON, defaultValue: [] },
    discount: { type: DataTypes.FLOAT, defaultValue: 0 },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
});

Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = Product;
