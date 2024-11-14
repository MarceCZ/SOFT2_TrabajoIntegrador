import EmailService from '../services/email.js';
import UsuarioService from '../services/usuario.js';

const resetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Validar si el correo existe
        const user = await UsuarioService.findOneEmail(email);

        if (!user) {
            return res.status(404).json({error: 404, message: "Correo electrónico no encontrado" });
        }

        const resetId = user.id;
        const resetLink = `http://localhost:3000/reset-password?id=${resetId}`;
        const userLink = {
            id: resetId,
            link: resetLink
        }
        //await EmailService.sendEmailWithAttachment(email, resetLink);
        console.log("Link para restablecer la contraseña:", resetLink);
        console.log("Correo electrónico:", email);
        console.log(user);
        return sendResult(userLink, res);
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        return sendResult(null, res);
    }
}

const sendResult = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({error: 500,  message: 'Error al procesar la solicitud'});
}

const controller = { resetPassword };

export default controller;
