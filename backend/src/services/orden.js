
/*
import Orden from '../models/orden.js'
import Cliente from '../models/cliente.js'
import DetalleOrden from '../models/detalleOrden.js'
import Producto from '../models/producto.js'

import RepositoryBase from '../repositories/base.js'

const ordenRepository = new RepositoryBase(Orden)
const detalleOrdenRepository = new RepositoryBase(DetalleOrden)

const findAllComplete = async () => {
    
    const ordenes = await Orden.findAll({
        include: [Cliente, { model: DetalleOrden, required: true, include: [Producto]}]
    })

    return ordenes
}

const findOneComplete = async (id) => {
    
    const orden = await Orden.findOne({
        where: { id },
        include: [Cliente, { model: DetalleOrden, required: true, include: [Producto]}]
    })

   
    return orden
}


///*
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
}
//*//*
 const service = {  findAllComplete,findOneComplete }

 export default service*/