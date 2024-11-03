import model from '../models/usuario.js'
import RepositoryBase from '../repositories/base.js';

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

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await model.findOne({ where: { email } });
    if (user && user.password === password) {
        return sendResult(user, res);
    } else {
        return sendResult(null, res);
    }
};

const sendResult = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Usuario o contraseña incorrectos.'});
}

const controller = { findAll, create, findOne, remove, update, login }

export default controller;
