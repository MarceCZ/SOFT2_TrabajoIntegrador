const Usuario = require('../models/usuario');
const Cliente = require('../models/cliente');
const Producto = require('../models/producto');
const Suscripcion = require('../models/suscripcion');
const Kit = require('../models/kit');
const KitProducto = require('../models/kit_producto');
const Botica = require('../models/botica');

const findAllComplete = async () => {
    try {
        const usuariosKits = await Usuario.findAll({
            include: [
                {
                    model: Cliente,
                    as: 'Cliente', 
                    required: true,
                    include: [
                        {
                            model: Suscripcion,
                            as: 'Suscripciones', 
                            required: true,
                            where: { estado: true }, 
                            limit: 1,
                            include: [
                                {
                                    model: Kit,
                                    as: 'Kits', 
                                    required: true,
                                    include: [
                                        {
                                            model: KitProducto,
                                            as: 'KitProductos', 
                                            required: true,
                                            include: [
                                                {
                                                    model: Producto,
                                                    as: 'Producto', 
                                                    required: true,
                                                    include: [
                                                        {
                                                            model: Botica,
                                                            as: 'Botica', 
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

       
        const usuariosConSuscripciones = usuariosKits.filter(
            (usuario) =>
                usuario.Cliente &&
                usuario.Cliente.Suscripciones &&
                usuario.Cliente.Suscripciones.length > 0
        );

        usuariosConSuscripciones.forEach((usuario) => {
            const suscripcion = usuario.Cliente.Suscripciones[0]; 
            if (suscripcion && suscripcion.Kits) {
                suscripcion.Kits.forEach((kit) => {
                    let newTotal = 0;
                    if (kit.KitProductos) {
                        kit.KitProductos.forEach((kitProducto) => {
                            const producto = kitProducto.Producto;
                            if (producto && kitProducto.cantProducto) {
                                const subtotal = (
                                    parseFloat(producto.precio) *
                                    kitProducto.cantProducto
                                ).toFixed(2);
                                kitProducto.dataValues.subtotal = subtotal;
                                newTotal += parseFloat(subtotal);
                            }
                        });
                        kit.dataValues.newTotal = newTotal.toFixed(2);
                    }
                });
            }
        });

        return usuariosConSuscripciones;
    } catch (error) {
        console.error('Error en findAllComplete:', error.message);
        throw error;
    }
};

const findOneCompleteCliente = async (id) => {
    try {
        const usuario = await Usuario.findOne({
            where: { id },
            include: [
                {
                    model: Cliente,
                    as: 'Cliente',
                    required: true,
                    include: [
                        {
                            model: Suscripcion,
                            as: 'Suscripciones',
                            required: true,
                            where: { estado: true },
                            include: [
                                {
                                    model: Kit,
                                    as: 'Kits',
                                    required: true,
                                    include: [
                                        {
                                            model: KitProducto,
                                            as: 'KitProductos',
                                            required: true,
                                            include: [
                                                {
                                                    model: Producto,
                                                    as: 'Producto',
                                                    required: true,
                                                    include: [
                                                        {
                                                            model: Botica,
                                                            as: 'Botica',
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        usuario.Cliente.Suscripciones.forEach((suscripcion) => {
            suscripcion.Kits.forEach((kit) => {
                let totalKit = 0;
                kit.KitProductos.forEach((kitProducto) => {
                    const producto = kitProducto.Producto;
                    if (producto && kitProducto.cantProducto) {
                        const subtotal =
                            parseFloat(producto.precio) * kitProducto.cantProducto;
                        kitProducto.dataValues.subtotal = subtotal.toFixed(2);
                        totalKit += subtotal;
                    }
                });
                kit.dataValues.totalKit = totalKit.toFixed(2);
            });
        });

        return usuario;
    } catch (error) {
        console.error('Error en findOneCompleteCliente:', error.message);
        throw error;
    }
};

module.exports = { findAllComplete, findOneCompleteCliente };
