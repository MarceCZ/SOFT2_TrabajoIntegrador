import sequelize from '../config/database.js'; // Asegúrate de importar la instancia de Sequelize
import newSuscripcion from '../models/suscripcion.js';
import Kit from '../models/kit.js';
import KitProducto from '../models/kit_producto.js';
import Cliente from '../models/cliente.js';

const getNextMonthFirstDay = () => {
    const now = new Date(); // Fecha actual
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1); // Primer día del mes siguiente
    return nextMonth;
};

const createSubswithKit = async (payload) => {
    const { userId, subsType, totalCartPrice, cartProducts } = payload;
    const months = subsType === '3meses' ? 3 : subsType === '6meses' ? 6 : 12;
    const totalSubs = totalCartPrice * months;
    const deliveryDate = getNextMonthFirstDay(); // Fecha de envío establecida al 1 del siguiente mes

    // Iniciar una transacción
    const transaction = await sequelize.transaction();

    try {
        // Obtener el cliente asociado al userId
        const cliente = await Cliente.findOne({ where: { idUsuario: userId } });
        if (!cliente) {
            throw new Error(`No se encontró un cliente asociado con el userId ${userId}`);
        }

        // Crear la suscripción
        const newSubs = await newSuscripcion.create({
            tipo: subsType,
            precio: totalSubs,
            idCliente: cliente.id
        }, { transaction });

        
        const newKit = await Kit.create({
            idSuscripcion: newSubs.id,
            fechaenvio: deliveryDate // cambiar 'fechaenvio' danny, por favor
        }, { transaction });

        // Crear los productos del kit en `kit_productos`
        const kitProduct = cartProducts.map(product => ({
            idProducto: product.productId,
            idKit: newKit.id,
            idReceta: product.recetaId || null,
            cantproducto: product.cantidad * months // cambiar 'cantproducto' danny, por favor
        }));
        await KitProducto.bulkCreate(kitProduct, { transaction });

        // Confirmar la transacción
        await transaction.commit();

        return { message: 'Subscripción creada con éxito.', id: newSubs.id, status: 200 };
    } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        throw new Error('Error en la creación de la subscripción: ' + error.message);
    }
}

export default { createSubswithKit }
