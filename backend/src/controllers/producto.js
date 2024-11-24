const model = require('../models/producto');
const RepositoryBase = require('../repositories/base');
const service = require('../services/producto');

const repository = new RepositoryBase(model);

const findAll = async (req, res) => {
    const result = await repository.findAll();
    return sendResult(result, res);
};

const create = async (req, res) => {
    const payload = req.body;
    const result = await repository.create(payload);
    return sendResult(result, res);
};

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await repository.findOne(id);
    return sendResult(result, res);
};

const findAllComplete = async (req, res) => {
    const result = await service.findAllComplete();
    return sendResult(result, res);
};

const findOneComplete = async (req, res) => {
    const id = req.params.id;
    const result = await service.findOneComplete(id);
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
    findAllComplete,
    findOneComplete,
};

module.exports = controller;

