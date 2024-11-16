import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'
import Cliente from './cliente.js'


const Suscripcion = sequelize.define('suscripcion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

Suscripcion.belongsTo(Cliente, { foreignKey: 'idCliente', targetId: 'id' })
Cliente.hasMany(Suscripcion, { foreignKey: 'idCliente'})

export default Suscripcion;