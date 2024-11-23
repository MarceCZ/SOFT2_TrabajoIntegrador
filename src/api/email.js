import base from './base.js'

const endpoint = 'email'

const requestPasswordReset = async (email) => {
    const response = await base.post(`${endpoint}/reset-request`, { email },{ withCredentials: true });
    return { status: response.status, message: response.message };
};

const verificarYCambiarPassword = async (email, verificationCode, newPassword) => {
    const response= await base.post(`${endpoint}/verificar-code`, {
        email,
        verificationCode,
        newPassword
    },{ withCredentials: true });
    return { status: response.status, message: response.message };
};

const enviarConsulta = async (email, nombre, consulta) => {
    const response= await base.post(`${endpoint}/enviar-consulta`, {
        email,
        nombre,
        consulta
    },{ withCredentials: true });
    return { status: response.status, message: response.message };
};


const api = { verificarYCambiarPassword, requestPasswordReset, enviarConsulta };

export default api;

