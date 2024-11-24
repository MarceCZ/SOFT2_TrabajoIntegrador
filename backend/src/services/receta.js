const Cliente = require('../models/cliente');
const Producto = require('../models/producto');
const Suscripcion = require('../models/suscripcion');
const Kit = require('../models/kit');
const KitProducto = require('../models/kit_producto');
const Botica = require('../models/botica');
const Receta = require('../models/receta');

const findAllComplete = async () => {
    try {
        const recetas = await Receta.findAll({
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
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        return recetas;
    } catch (error) {
        console.error('Error al obtener todas las recetas completas:', error);
        throw error;
    }
};

const findAllCompleteXBotica = async (id) => {
    try {
        const recetas = await Receta.findAll({
            include: [
                {
                    model: Cliente,
                    as: 'Cliente', 
                },
                {
                    model: KitProducto,
                    as: 'KitProductos', 
                    required: true,
                    include: [
                        {
                            model: Producto,
                            as: 'Producto', 
                            required: true,
                            where: { idBotica: id },
                        }
                    ]
                }
            ]
        });

        return recetas;
    } catch (error) {
        console.error(`Error al obtener recetas completas para la botica con ID ${id}:`, error);
        throw error;
    }
};

module.exports = { findAllComplete, findAllCompleteXBotica };
