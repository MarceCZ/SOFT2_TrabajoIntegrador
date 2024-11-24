import base from './base.js';

const endpoint = 'suscripcion';

const create = async (payload) => await base.post(`${endpoint}/create`, payload);

const cancel = async (suscripcionId) => await base.post(`${endpoint}/cancel/${suscripcionId}`);

const api = { create, cancel };

export default api;
