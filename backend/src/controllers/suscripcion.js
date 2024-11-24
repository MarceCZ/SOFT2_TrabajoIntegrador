import model from '../models/suscripcion.js';
import RepositoryBase from '../repositories/base.js';
import service from '../services/suscripcion.js';

const repository = new RepositoryBase(model);

const findAll = async (req, res) => {
    const result = await repository.findAll();
    return sendResult(result, res);
};

const create = async (req, res) => {
    try {
        const { userId, subsType, totalCartPrice, recetaLink, cartProducts } = req.body;
        // Validar los campos obligatorios
        if (
            userId === undefined ||
            userId === null ||
            !subsType ||
            !totalCartPrice ||
            !cartProducts ||
            !Array.isArray(cartProducts) ||
            cartProducts.length === 0
        ) {
            return res.status(400).json({ message: 'Los campos obligatorios están incompletos.' });
        }

        const result = await service.createSubswithKit(req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error en la creacion de la subscripcion.' });
    }
};

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await repository.findOne(id);
    return sendResult(result, res);
};

const remove = async (req, res) => {
    const id = req.params.id;
    const result = await repository.remove(id);
    return sendResult(result, res);
};

const update = async (req, res) => {
    const payload = req.body;
    const result = await repository.update(payload);
    return sendResult(result, res);
};

const sendResult = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'No encontrado.'});
};

const cancelSuscripcion = async (req, res) => {
    const { id } = req.params; // Capturamos el ID desde los parámetros de la URL

    if (!id) {
        return res.status(400).json({ message: 'El ID de la suscripción es requerido.' });
    }

    try {
        // Llamamos al servicio para cancelar la suscripción
        const result = await service.cancelSubscription(id);
        return res.status(result.status).json(result); 
    } catch (error) {
        return res.status(500).json({ message: error.message }); // Manejo de errores
    }
};

const removeAllSubscriptions = async (req, res) => {
    try {
        const result = await service.resetAllSubscriptions(); 
        return res.status(result.status).json(result); 
    } catch (error) {
        return res.status(500).json({ message: error.message }); 
    }
};

const controller = { findAll, create, findOne, remove, update, cancelSuscripcion, removeAllSubscriptions }

export default controller;
