import base from './base.js'

const endpoint = 'email'

const requestPasswordReset = async (email) => {
    const response = await base.post(`${endpoint}/reset-request`, { email });
    return { status: response.status, message: response.message };
};

const verificarYCambiarPassword = async (email, verificationCode, newPassword) => {
    const response= await base.post(`${endpoint}/verificar-code`, {
        email,
        verificationCode,
        newPassword
    });
    return { status: response.status, message: response.message };
};


const api = { verificarYCambiarPassword, requestPasswordReset };

export default api;

