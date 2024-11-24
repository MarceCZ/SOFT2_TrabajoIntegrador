const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Usuario = require('./usuario');

const Botica = sequelize.define('botica', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Botica;
