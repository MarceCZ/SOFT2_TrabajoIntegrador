const Usuario = require('./usuario');
const Cliente = require('./cliente');
const Producto = require('./producto');
const Administrador = require('./administrador');
const Botica = require('./botica');
const KitProducto = require('./kit_producto');
const Kit = require('./kit');
const Receta = require('./receta');
const Suscripcion = require('./suscripcion');

Usuario.hasOne(Cliente, { as: 'Cliente', foreignKey: 'idUsuario' });
Cliente.belongsTo(Usuario, { as: 'Usuario', foreignKey: 'idUsuario' });

Usuario.hasOne(Administrador, { as: 'Administrador', foreignKey: 'idUsuario' });
Administrador.belongsTo(Usuario, { as: 'Usuario', foreignKey: 'idUsuario' });

Usuario.hasMany(Botica, { as: 'Boticas', foreignKey: 'idUsuario' });
Botica.belongsTo(Usuario, { as: 'Usuario', foreignKey: 'idUsuario' });

Cliente.hasMany(Receta, { as: 'Recetas', foreignKey: 'idCliente' });
Receta.belongsTo(Cliente, { as: 'Cliente', foreignKey: 'idCliente' });

Cliente.hasMany(Suscripcion, { as: 'Suscripciones', foreignKey: 'idCliente' });
Suscripcion.belongsTo(Cliente, { as: 'Cliente', foreignKey: 'idCliente' });

Suscripcion.hasMany(Kit, { as: 'Kits', foreignKey: 'idSuscripcion' });
Kit.belongsTo(Suscripcion, { as: 'Suscripcion', foreignKey: 'idSuscripcion' });

Kit.hasMany(KitProducto, { as: 'KitProductos', foreignKey: 'idKit' });
KitProducto.belongsTo(Kit, { as: 'Kit', foreignKey: 'idKit' });

Producto.hasMany(KitProducto, { as: 'KitProductos', foreignKey: 'idProducto' });
KitProducto.belongsTo(Producto, { as: 'Producto', foreignKey: 'idProducto' });

Receta.hasMany(KitProducto, { as: 'KitProductos', foreignKey: 'idReceta' });
KitProducto.belongsTo(Receta, { as: 'Receta', foreignKey: 'idReceta' });

Botica.hasMany(Producto, { as: 'Productos', foreignKey: 'idBotica' });
Producto.belongsTo(Botica, { as: 'Botica', foreignKey: 'idBotica' });

module.exports = {};
