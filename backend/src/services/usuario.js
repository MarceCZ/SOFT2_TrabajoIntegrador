
import Usuario from '../models/usuario.js'
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


 const service = {findOneEmail, updatePassword}

 export default service