import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'
import Botica from './botica.js'

//import Serie from './serie.js';

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
})

Producto.belongsTo(Botica, { foreignKey: 'idBotica', targetId: 'id' })

Botica.hasMany(Producto, { foreignKey: 'idBotica'});

export default Producto;