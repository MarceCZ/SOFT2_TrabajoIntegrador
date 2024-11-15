import model from '../models/usuario.js'
import RepositoryBase from '../repositories/base.js';
import service from '../services/cliente.js'
const repository = new RepositoryBase(model);

const findAll = async (req, res) => {

    const result = await repository.findAll();

    return sendResult(result, res);
}

const findAllComplete = async (req, res) => {

    const result = await service.findAllComplete();

    return sendResult(result, res);
}

//encontrar un usuario con su cliente
const findOneComplete = async (req, res) => {
    const id = req.params.id;
    const usuario = await service.findOneComplete(id);

    if(usuario && usuario.cliente) {
        const dataCliente = {
            nombre: usuario.cliente.nombre,
            apellido1: usuario.cliente.apellido1,
            apellido2: usuario.cliente.apellido2,
            direccion: usuario.cliente.direccion,
            referencias: usuario.cliente.referencias,
            distrito: usuario.cliente.distrito,
            celular: usuario.cliente.celular,
            email: usuario.email,
            dni: usuario.cliente.dni,
        }

        return res.status(200).json(dataCliente);
    }
    else {
        return res.status(404).json({ message: 'Cliente no encontrado.'});
    }
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
    console.log("Intento de login con:", email, password);  // Debugging

    try {
        const user = await model.findOne({ where: { email } });
        console.log("Usuario encontrado:", user);  // Verifica si el usuario es encontrado

        if (user && user.password === password) {
            return sendResult(user, res);
        } else {
            console.log("Contraseña incorrecta o usuario no encontrado");
            return sendResult(null, res);
        }
    } catch (error) {
        console.error("Error en la función login:", error);
        return res.status(500).json({ message: "Error en el servidor al buscar el usuario." });
    }
};

const findOneEmail = async (email) => {
    try {
        const user = await model.findOne({ where: { email } });
        return user;
    } catch (error) {
        console.error("Error en al encontrar el correo:", error);
        throw new Error("Error al buscar el usuario por correo electrónico.");
    }
};

const updatePassword = async (email, newPassword) => {
    try {
        const result = await model.update(
            { password: newPassword }, 
            { where: { email } }      
        );
        return result;
    } catch (error) {
        console.error("Error en updatePassword:", error);
        throw new Error("Error al actualizar la contraseña.");
    }
};


//enviar el resultado
const sendResult = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Usuario o contraseña incorrectos.'});
}

const controller = {  findAll, create, findOne, remove, update, login,findAllComplete ,findOneComplete, findOneEmail, updatePassword }

export default controller;
