const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Cliente = require('./cliente');

const Receta = sequelize.define('receta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Receta;
