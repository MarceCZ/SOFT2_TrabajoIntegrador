
import Usuario from '../models/usuario.js'
import Cliente from '../models/cliente.js'



const findAllComplete = async () => {
    
    const usuarios = await Usuario.findAll({
        include: [{ model: Cliente, required: true}]
    })

    return usuarios
}

const findOneComplete = async (id) => {
    
    const usuario = await Usuario.findOne({
        where: { id },
        include: [{ model: Cliente, required: true}]
    })

    return usuario
}

 const service = {  findAllComplete,findOneComplete }

 export default service