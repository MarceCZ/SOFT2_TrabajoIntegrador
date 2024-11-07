import base from './base.js'

const endpoint = 'usuario'

const findOneComplete = async (id) => await base.get(`${endpoint}/complete/${id}`);

const api = { findOneComplete };

export default api;

