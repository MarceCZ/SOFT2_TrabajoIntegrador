import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'
import Usuario from './usuario.js'

const Botica = sequelize.define('botica', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },    
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

Botica.belongsTo(Usuario,     { foreignKey: 'idUsuario', targetId: 'id' })




export default Botica;