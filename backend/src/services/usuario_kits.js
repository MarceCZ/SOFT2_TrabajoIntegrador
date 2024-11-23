
import Producto from '../models/producto.js'
import Usuario from '../models/usuario.js'
import Cliente from '../models/cliente.js'
import Suscripcion from '../models/suscripcion.js'
import Kit from '../models/kit.js'
import KitProducto from '../models/kit_producto.js'
import { where } from 'sequelize'
import Botica from '../models/botica.js'

const findAllComplete = async () => {
    
    const usuariosKits = await Usuario.findAll({
        include: [
            {
                model: Cliente,
                required: true,
                include: [
                    {
                        model: Suscripcion,
                        required: true,
                        where: { estado: true }, // Filtra solo suscripciones activas
                        limit: 1,
                        include: [
                            {
                                model: Kit,
                                required: true,
                                include: [
                                    {
                                        model: KitProducto,
                                        required: true,
                                        include: [
                                            {
                                                model: Producto,
                                                required: true
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    });


    const usuariosConSuscripciones = usuariosKits.filter(usuario => 
        usuario.cliente && usuario.cliente.suscripcions && usuario.cliente.suscripcions.length > 0
    );

    usuariosConSuscripciones.forEach(usuario => {
        const suscripcion = usuario.cliente.suscripcions[0]; // Obtener la primera suscripción activa
        if (suscripcion && suscripcion.kits) {
            suscripcion.kits.forEach(kit => {
                let newTotal = 0;
                if (kit.kit_productos) {
                    kit.kit_productos.forEach(kitProducto => {
                        const producto = kitProducto.producto;
                        if (producto && kitProducto.cantProducto) {
                            const subtotal = (parseFloat(producto.precio) * kitProducto.cantProducto).toFixed(2);
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

    /*usuariosKits.forEach(usuario => {
        if (usuario.cliente && usuario.cliente.suscripcions && usuario.cliente.suscripcions.kits) {
            usuario.cliente.suscripcions[0].kits.forEach(kit => {
                let newTotal = 0;
                if (kit.kit_productos) {
                    kit.kit_productos.forEach(kitProducto => {
                        const producto = kitProducto.producto;
                        if (producto && kitProducto.cantProducto) {
                            const subtotal = (parseFloat(producto.precio) * kitProducto.cantProducto).toFixed(2);
                            kitProducto.dataValues.subtotal = subtotal; 
                            newTotal += parseFloat(subtotal);
                        }
                    });
                    kit.dataValues.newTotal = newTotal.toFixed(2);
                }
            });
        }
    });

    return usuariosKits*/
}

const findOneCompleteCliente = async (id) => {

    try {
        // Busca el usuario con todos los kits y productos relacionados
        const usuario = await Usuario.findOne({
            where: { id },
            include: [
                {
                    model: Cliente,
                    required: true,
                    include: [
                        {
                            model: Suscripcion,
                            required: true,
                            where: { estado: true }, // Filtra solo suscripciones activas
                            include: [
                                {
                                    model: Kit,
                                    required: true,
                                    include: [
                                        {
                                            model: KitProducto,
                                            required: true,
                                            include: [
                                                {
                                                    model: Producto,
                                                    required: true, // Relación con Producto
                                                    include: [Botica], // Incluye Botica si es necesario
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        // Procesa los kits para calcular totales
        usuario.cliente.suscripcions.forEach((suscripcion) => {
            suscripcion.kits.forEach((kit) => {
                let totalKit = 0;
                kit.kit_productos.forEach((kitProducto) => {
                    const producto = kitProducto.producto;
                    if (producto && kitProducto.cantProducto) {
                        const subtotal = parseFloat(producto.precio) * kitProducto.cantProducto;
                        kitProducto.dataValues.subtotal = subtotal.toFixed(2);
                        totalKit += subtotal;
                    }
                });
                kit.dataValues.totalKit = totalKit.toFixed(2); // Agrega el total del kit
            });
        });

        return usuario; // Devuelve toda la información del usuario
    } catch (error) {
        console.error("Error en findUserAndKitDetails:", error.message);
        throw error;
    }
};


const service = {  findAllComplete, findOneCompleteCliente }

export default service