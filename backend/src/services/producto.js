const Botica = require('../models/botica');
const Producto = require('../models/producto');

const findAllComplete = async () => {
    try {
        const productos = await Producto.findAll({
            include: [{ model: Botica, as: 'Botica', required: true }], 
        });

        return productos;
    } catch (error) {
        console.error('Error al obtener los productos con boticas:', error);
        throw error;
    }
};

const findOneComplete = async (id) => {
    try {
        const producto = await Producto.findOne({
            where: { id },
            include: [{ model: Botica, as: 'Botica', required: true }], 
        });

        return producto;
    } catch (error) {
        console.error(`Error al obtener el producto con ID ${id}:`, error);
        throw error;
    }
};

module.exports = { findAllComplete, findOneComplete };
