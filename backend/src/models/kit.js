const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Suscripcion = require('./suscripcion');

const Kit = sequelize.define('kit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idSuscripcion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = Kit;
