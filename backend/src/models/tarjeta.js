import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'
import Cliente from './cliente.js';


const Tarjeta = sequelize.define('tarjeta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    titular: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mesCaducidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    anioCaducidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cvv: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

Tarjeta.belongsTo(Cliente, { foreignKey: 'idCliente', targetId: 'id' })





export default Tarjeta;