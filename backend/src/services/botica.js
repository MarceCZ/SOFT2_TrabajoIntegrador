
import Botica from '../models/botica.js'
import Producto from '../models/producto.js'

import RepositoryBase from '../repositories/base.js'


const findAllComplete = async () => {
    
    const boticas = await Botica.findAll({
        include: [{ model: Producto, required: true}]
    })

    return boticas
}

const findOneComplete = async (id) => {
    
    const orden = await Botica.findOne({
        where: { id },
        include: [{ model: Producto, required: true}]
    })

   
    return orden
}


/*
const create = async (payload) => {

    const { productos } = payload;

    if (!productos) return null;

    const result = await ordenRepository.create(payload)

    result.productos = []

    if (result) {

        productos.forEach(async producto => {
            const objDetalOrden = { idCurso: producto.idCurso, idMatricula: result.id }
            const resultDetalOrden= await detalleOrdenRepository.create(objDetalOrden);

            if (resultDetalOrden)
                result.cursos.push(resultDetalOrden);

        });
    }
    
    return result
}*/
 const service = {  findAllComplete,findOneComplete }

 export default service