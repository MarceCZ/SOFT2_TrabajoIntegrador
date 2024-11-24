const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Cliente = require('./cliente');

const Producto = sequelize.define('producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    presentacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contraindicaciones: {
        type: DataTypes.STRING,
        allowNull: false
    },
    advertencias: {
        type: DataTypes.STRING,
        allowNull: false
    },
    receta: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    idBotica: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Producto;
