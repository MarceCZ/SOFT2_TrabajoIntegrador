import Botica from '../models/botica.js'
import Producto from '../models/producto.js'

import RepositoryBase from '../repositories/base.js'


const findAllComplete = async () => {
    
    const productos = await Producto.findAll({
        include: [Botica]
    })
    return productos
}

const findOneComplete = async (id) => {
    
    const producto = await Producto.findOne({
        where: { id },
        include: [Botica]
    })

   
    return producto
}

const service = {  findAllComplete,findOneComplete }

export default service