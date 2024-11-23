import base from './base.js'

const endpoint = 'kit_producto'

const findOneCompleteCliente = async (id) => await base.get(`${endpoint}/complete/${id}`)

const api = { findOneCompleteCliente }

export default api;