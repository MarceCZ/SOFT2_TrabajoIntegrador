import base from './base.js';

const endpoint = 'suscripcion';

const create = async (payload) => await base.post(`${endpoint}/create`, payload);

const api = { create };

export default api;
