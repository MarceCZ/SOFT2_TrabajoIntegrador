import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'
import Cliente from './cliente.js';


const Receta = sequelize.define('receta', {
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
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

Receta.belongsTo(Cliente, { foreignKey: 'idCliente', targetId: 'id' })

Cliente.hasMany(Receta, { foreignKey: 'idCliente'});

export default Receta;