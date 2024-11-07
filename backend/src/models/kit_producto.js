import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'
import Kit from './kit.js'
import Producto from './producto.js'
import Receta from './receta.js'

const KitProducto = sequelize.define('kit_producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idKit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idReceta: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
})

KitProducto.belongsTo(Producto, { foreignKey: 'idProducto', targetId: 'id' })
KitProducto.belongsTo(Kit, { foreignKey: 'idKit', targetId: 'id' })
KitProducto.belongsTo(Receta, { foreignKey: 'idReceta', targetId: 'id' })

Producto.hasMany(KitProducto, { foreignKey: 'idProducto'});
Kit.hasMany(KitProducto, { foreignKey: 'idKit'});
Receta.hasMany(KitProducto, { foreignKey: 'idReceta'});

export default KitProducto;