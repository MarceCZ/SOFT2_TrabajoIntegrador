import base from './base.js';

const endpoint = 'cliente';

const update = async (id, data) => await base.put(`${endpoint}/${id}`, data);

const api = { update };

export default api;