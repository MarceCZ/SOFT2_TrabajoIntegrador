import EmailService from '../services/email.js';
import UsuarioService from '../services/usuario.js';

const generarVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const resetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // validar si el correo existe
        const user = await UsuarioService.findOneEmail(email);

        if (!user) {
            return res.status(404).json({error: 404, message: "Correo electrónico no encontrado" });
        }

        const verificationCode = generarVerificationCode();
        req.session.verificationCode = verificationCode;
        req.session.email = email;

        //enviar correo
        await EmailService.sendVerificationCodeEmail(email, verificationCode, user.name);

        console.log("Código de verificación enviado a:", email);
        return res.status(200).json({ message: "Código de verificación enviado" });
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        return res.status(500).json({ error: "Error al procesar la solicitud" });
    }
};

const verificarCodeCambiarPassword = async (req, res) => {
    const { email, verificationCode, newPassword } = req.body;

    if (req.session.verificationCode !== verificationCode || req.session.email !== email) {
        return res.status(400).json({ error: "Código de verificación o correo incorrecto" });
    }

    try {
        await UsuarioService.updatePassword(email, newPassword);

        req.session.verificationCode = null;
        req.session.email = null;

        return res.status(200).json({ message: "Contraseña actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        return res.status(500).json({ error: "Error al actualizar la contraseña" });
    }
};

export default { resetPassword, verificarCodeCambiarPassword };
