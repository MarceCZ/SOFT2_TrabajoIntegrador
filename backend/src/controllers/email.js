import EmailService from '../services/email.js';
import UsuarioService from '../services/usuario.js';

const generarVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const resetPassword = async (req, res) => {
    console.log("Sesión actual:", req.session);
    const { email } = req.body;

    try {
        // validar si el correo existe
        const user = await UsuarioService.findOneEmail(email);
        console.log("Respuesta del backend:", user);

        if (!user) {
            return res.status(404).json({ status: 404, message: "Correo electrónico no encontrado" });
        }

        const verificationCode = generarVerificationCode();
        req.session.verificationCode = verificationCode;
        req.session.email = email;

        console.log("Código guardado en sesión:", req.session.verificationCode); 
        console.log("Email guardado en sesión:", req.session.email);  

        //enviar correo
        await EmailService.sendVerificationCodeEmail(email, verificationCode, user.name);

        console.log("Código de verificación enviado a:", email);
        return res.status(200).json({ status: 200, message: "Código de verificación enviado" });
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        return res.status(500).json({ status: 500, message: "Error al procesar la solicitud. Intente nuevamente más tarde." });
    }
 };

const verificarCodeCambiarPassword = async (req, res) => {
    const { email, verificationCode, newPassword } = req.body;

    console.log("Correo recibido:", email);
    console.log("Código de verificación recibido:", verificationCode);
    console.log("Código de verificación en sesión:", req.session.verificationCode);
    console.log("Correo en sesión:", req.session.email);


    if (req.session.verificationCode !== verificationCode || req.session.email !== email) {
        return res.status(400).json({ status: 400, message: "Código de verificación o correo incorrecto" });
    }

    try {
        await UsuarioService.updatePassword(email, newPassword);

        req.session.verificationCode = null;
        req.session.email = null;

        return res.status(200).json({ status: 200, message: "Contraseña actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        return res.status(500).json({ status: 500, message: "Error al actualizar la contraseña" });
    }
};

export default { resetPassword, verificarCodeCambiarPassword };
