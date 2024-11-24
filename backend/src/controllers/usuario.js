const model = require('../models/usuario');
const RepositoryBase = require('../repositories/base');
const service = require('../services/cliente');
const usuarioService = require('../services/usuario');
const usuarioKitsService = require('../services/usuario_kits');

const repository = new RepositoryBase(model);

const findAll = async (req, res) => {
    const result = await repository.findAll();
    return sendResult(result, res);
};

const findAllComplete = async (req, res) => {
    const result = await service.findAllComplete();
    return sendResult(result, res);
};

const findAllCompleteUsuarioKits = async (req, res) => {
    const result = await usuarioKitsService.findAllComplete();
    return sendResult(result, res);
};

const findOneComplete = async (req, res) => {
    const id = req.params.id;
    const usuario = await service.findOneComplete(id);

    if (usuario && usuario.cliente) {
        const dataCliente = {
            id: usuario.cliente.id,
            nombre: usuario.cliente.nombre,
            apellido1: usuario.cliente.apellido1,
            apellido2: usuario.cliente.apellido2,
            direccion: usuario.cliente.direccion,
            referencias: usuario.cliente.referencias,
            distrito: usuario.cliente.distrito,
            celular: usuario.cliente.celular,
            email: usuario.email,
            dni: usuario.cliente.dni,
        };

        return res.status(200).json(dataCliente);
    } else {
        return res.status(404).json({ message: 'Cliente no encontrado.' });
    }
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

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usuarioService.authenticateUser(email, password);

        if (user) {
            return sendResult(user, res);
        } else {
            return res.status(500).json({ message: 'Usuario o contraseña incorrectos.' });
        }
    } catch (error) {
        console.error("Error en la función login:", error);
        return res.status(500).json({ message: "Error en el servidor." });
    }
};

const sendResult = (result, res) => {
    if (result) {
        return res.status(200).json(result);
    } else {
        return res.status(500).json({ message: 'Error' });
    }
};

const signin = async (req, res) => {
    try {
        const payload = req.body;
        const result = await usuarioService.crearUsuarioCliente(payload);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error en la creación del usuario: ', error);
        return res.status(500).json({
            message: 'Error en la creación del usuario y cliente: ' + error.message,
        });
    }
};

const controller = {
    findAll,
    create,
    findOne,
    remove,
    update,
    login,
    findAllComplete,
    findOneComplete,
    findAllCompleteUsuarioKits,
    signin,
};

module.exports = controller;

