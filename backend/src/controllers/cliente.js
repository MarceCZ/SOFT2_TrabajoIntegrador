const model = require('../models/cliente');
const RepositoryBase = require('../repositories/base');

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

const remove = async (req, res) => {
    const id = req.params.id;
    const result = await repository.remove(id);
    return sendResult(result, res);
};

const update = async (req, res) => {
    const { id } = req.params;
    const payload = req.body;

    if (!id) {
        return res.status(400).json({ message: "Se necesita el ID del cliente" });
    }

    try {
        const rowsUpdated = await repository.update({ ...payload, id });

        if (!rowsUpdated || rowsUpdated[0] === 0) {
            return res.status(404).json({ message: "Cliente no encontrado o no se realizaron cambios." });
        }

        return res.status(200).json({
            message: "Cliente actualizado exitosamente."
        });
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        return res.status(500).json({
            message: "Error al actualizar el cliente.",
            error: error.message,
        });
    }
};

const sendResult = (result, res) => {
    if (result) {
        return res.status(200).json(result);
    } else {
        return res.status(500).json({ message: 'No encontrado.' });
    }
};

const controller = { findAll, create, findOne, remove, update };

module.exports = controller;

