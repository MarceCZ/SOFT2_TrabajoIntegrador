const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Usuario = require('./usuario');

const Cliente = sequelize.define('cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    distrito: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    referencias: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Cliente;

