const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Usuario = require('./usuario');

const Administrador = sequelize.define('administrador', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Administrador;
