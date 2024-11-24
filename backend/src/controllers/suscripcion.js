const model = require('../models/suscripcion');
const RepositoryBase = require('../repositories/base');
const service = require('../services/suscripcion');

const repository = new RepositoryBase(model);

const findAll = async (req, res) => {
    const result = await repository.findAll();
    return sendResult(result, res);
};

const create = async (req, res) => {
    try {
        const payload = req.body;
        const result = await service.createSubswithKit(payload);
        return res.status(200).json(result);
    } catch (error) {
        console.log('Error en la creación de la suscripción: ', error);
        return res.status(500).json({ message: 'Error en la creación de la suscripción.' });
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

const cancelSuscripcion = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'El ID de la suscripción es requerido.' });
    }
    try {
        const result = await service.cancelSubscription(id);
        return res.status(result.status).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
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

const sendResult = (result, res) => {
    if (result) {
        return res.status(200).json(result);
    } else {
        return res.status(500).json({ message: 'No encontrado.' });
    }
};

const controller = {
    findAll,
    create,
    findOne,
    remove,
    update,
    cancelSuscripcion,
    removeAllSubscriptions,
};

module.exports = controller;

