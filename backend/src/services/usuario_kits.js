
import Producto from '../models/producto.js'
import Usuario from '../models/usuario.js'
import Cliente from '../models/cliente.js'
import Suscripcion from '../models/suscripcion.js'
import Kit from '../models/kit.js'
import KitProducto from '../models/kit_producto.js'

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


const service = {  findAllComplete }

export default service