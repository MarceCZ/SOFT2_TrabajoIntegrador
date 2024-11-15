import base from './base.js'

const endpoint = 'usuario'

const findOneComplete = async (id) => await base.get(`${endpoint}/complete/${id}`);

const login = async (email, password) => {
    return await base.post(`${endpoint}/login`, { email, password });
  };



const api = { findOneComplete, login };

export default api;

