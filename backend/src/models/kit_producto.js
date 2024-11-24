const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Kit = require('./kit');
const Producto = require('./producto');
const Receta = require('./receta');

const KitProducto = sequelize.define('kit_producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    cantProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idKit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idReceta: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

module.exports = KitProducto;
