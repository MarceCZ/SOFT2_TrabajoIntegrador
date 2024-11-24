const Botica = require('../models/botica');
const Producto = require('../models/producto');

const findAllComplete = async () => {
    try {
        const boticas = await Botica.findAll({
            include: [{ model: Producto, as: 'Productos', required: true }], 
        });
        return boticas;
    } catch (error) {
        console.error('Error al obtener las boticas con productos:', error);
        throw error;
    }
};

const findOneComplete = async (id) => {
    try {
        const botica = await Botica.findOne({
            where: { id },
            include: [{ model: Producto, as: 'Productos', required: true }], 
        });
        return botica;
    } catch (error) {
        console.error(`Error al obtener la botica con ID ${id}:`, error);
        throw error;
    }
};

module.exports = { findAllComplete, findOneComplete };

