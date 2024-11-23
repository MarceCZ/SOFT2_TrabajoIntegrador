
import Producto from '../models/producto.js'
import Usuario from '../models/usuario.js'
import Cliente from '../models/cliente.js'
import Suscripcion from '../models/suscripcion.js'
import Kit from '../models/kit.js'
import KitProducto from '../models/kit_producto.js'
import Botica from '../models/botica.js'
import Receta from '../models/receta.js'
import { where } from 'sequelize'

const findAllComplete = async () => {
    const recetas = await Receta.findAll({
        include: [
            {
                model: KitProducto,
                required: true,
                include: [
                    {
                        model: Producto,
                        required: true,
                        include: [Botica]
                    }

                ]
            }
        ]
    });

    return recetas;
}


const findAllCompleteXBotica = async (id) => {
    const recetas = await Receta.findAll({
        include: [Cliente,
            {
                model: KitProducto,
                required: true,
                include: [
                    {
                        model: Producto,
                        required: true,
                        where: { idBotica: id },
                    }

                ]
            }
        ]
    });

    return recetas;
}


const service = {  findAllComplete, findAllCompleteXBotica }

export default service