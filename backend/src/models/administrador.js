import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

import Usuario from './usuario.js'


const Administrador = sequelize.define('administrador', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

Administrador.belongsTo(Usuario,     { foreignKey: 'idUsuario', targetId: 'id' })




export default Administrador;