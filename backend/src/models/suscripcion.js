const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Cliente = require('./cliente');

const Suscripcion = sequelize.define('suscripcion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

module.exports = Suscripcion;
