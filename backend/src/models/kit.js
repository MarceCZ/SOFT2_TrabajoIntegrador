import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'
import Suscripcion from './suscripcion.js'

const Kit = sequelize.define('kit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idSuscripcion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

Kit.belongsTo(Suscripcion, { foreignKey: 'idSuscripcion', targetId: 'id' })
Suscripcion.hasMany(Kit, { foreignKey: 'idSuscripcion'});




export default Kit;