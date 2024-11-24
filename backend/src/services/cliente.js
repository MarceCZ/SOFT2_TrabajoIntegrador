const Usuario = require('../models/usuario');
const Cliente = require('../models/cliente');

const findAllComplete = async () => {
    try {
        const usuarios = await Usuario.findAll({
            include: [{ model: Cliente, as: 'Cliente', required: true }], 
        });

        return usuarios;
    } catch (error) {
        console.error('Error al obtener los usuarios con clientes:', error);
        throw error;
    }
};

const findOneComplete = async (id) => {
    try {
        const usuario = await Usuario.findOne({
            where: { id },
            include: [{ model: Cliente, as: 'Cliente', required: true }],
        });

        return usuario;
    } catch (error) {
        console.error(`Error al obtener el usuario con ID ${id}:`, error);
        throw error;
    }
};

module.exports = { findAllComplete, findOneComplete };
