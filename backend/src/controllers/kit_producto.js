import model from '../models/kit_producto.js'
import RepositoryBase from '../repositories/base.js';
import service from '../services/usuario_kits.js';


const repository = new RepositoryBase(model);

const findAll = async (req, res) => {

    const result = await repository.findAll();

    return sendResult(result, res);
}

const create = async (req, res) => {
    const payload = req.body;

    const result = await repository.create(payload);

    return sendResult(result, res);
}

const findOne = async (req, res) => {

    const id = req.params.id;

    const result = await repository.findOne(id);

    return sendResult(result, res);
}

const findOneCompleteCliente = async (req, res) => {

    const id = req.params.id;

    const result = await service.findOneCompleteCliente(id);

    return sendResult(result, res);
}

const remove = async (req, res) => {
    const id = req.params.id;

    const result = await repository.remove(id);

    return sendResult(result, res);
}

const update = async (req, res) => {
    const payload = req.body;

    const result = await repository.update(payload);

    return sendResult(result, res);
}

const sendResult = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'No encontrado.'});
}

const controller = { findAll, create, findOne, remove, update, findOneCompleteCliente }

export default controller;
