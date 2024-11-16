import sequelize from '../config/database.js';
import Usuario from '../models/usuario.js';
import Cliente from '../models/cliente.js';

const findOneEmail = async (email) => {
    return await Usuario.findOne({
        where: {
            email: email
        }
    });
};

const updatePassword = async (email, newPassword) => {
    try {
        const result = await Usuario.update(
            { password: newPassword }, 
            { where: { email } }      
        );
        return result;
    } catch (error) {
        console.error("Error en updatePassword:", error);
        throw new Error("Error al actualizar la contraseña.");
    }
};

const crearUsuarioCliente = async (payload) => {
    const {email, password, dni, nombre, apellido1, apellido2, celular, distrito, referencias, direccion} = payload;

    if (!email || !password || !dni || !nombre || !apellido1 || !apellido2 || !celular || !distrito || !referencias || !direccion) {
        throw new Error('Faltan datos obligatorios.');
    }

    // Verificar si ya existe un usuario con el mismo correo
    const existente = await Usuario.findOne({ where: { email } });
    if (existente) {
        throw new Error(`El correo ${email} ya está registrado.`);
    }

    const transaction = await sequelize.transaction();

    try {
        // Crear el usuario
        const newUser = await Usuario.create({ email, password }, { transaction });

        // Crear el cliente asociado
        await Cliente.create({
            dni,
            nombre,
            apellido1,
            apellido2,
            direccion,
            distrito,
            referencias,
            celular,
            idUsuario: newUser.id,
        }, { transaction });

        await transaction.commit();

        return { message: 'Usuario y cliente creados con éxito.', idUsuario: newUser.id, status: 200 };
    } catch (error) {
        await transaction.rollback();
        throw new Error('Error al crear el usuario y cliente: ' + error.message);
    }
};


 const service = {findOneEmail, updatePassword, crearUsuarioCliente}

 export default service