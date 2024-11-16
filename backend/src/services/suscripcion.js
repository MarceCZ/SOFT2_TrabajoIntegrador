import sequelize from '../config/database.js'; // Asegúrate de importar la instancia de Sequelize
import newSuscripcion from '../models/suscripcion.js';
import Kit from '../models/kit.js';
import KitProducto from '../models/kit_producto.js';
import Cliente from '../models/cliente.js';

//obtener el primer día del mes siguiente
const getNextMonthFirstDay = () => {
    const now = new Date(); // Fecha actual
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1); // Primer día del mes siguiente
    return nextMonth;
}

//crear y registrar una suscripción con un kit en la base de datos
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
            idCliente: cliente.id,
            estado: true
        }, { transaction });

        
        const newKit = await Kit.create({
            idSuscripcion: newSubs.id,
            fecha: deliveryDate 
        }, { transaction });

        // Crear los productos del kit en `kit_productos`
        const kitProduct = cartProducts.map(product => ({
            idProducto: product.productId,
            idKit: newKit.id,
            idReceta: product.recetaId || null,
            cantProducto: product.cantidad * months 
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


//cancelar una suscripción
const cancelSubscription = async (subscriptionId) => {
    try {
        const suscripcion = await newSuscripcion.findOne({ where: { id: subscriptionId } });

        if (!suscripcion) {
            throw new Error('Suscripción no encontrada.');
        }

        // Cambiar el estado a false
        await newSuscripcion.update(
            { estado: false }, 
            { where: { id: subscriptionId } }
        );

        return { message: 'Suscripción cancelada con éxito.', status: 200 };
    } catch (error) {
        throw new Error('Error al cancelar la suscripción: ' + error.message);
    }
}

//funcion opcional para eliminar todas las suscripciones
const resetAllSubscriptions = async () => {
    const transaction = await sequelize.transaction();

    try {
        // Paso 1: Eliminar los productos asociados a todos los kits
        await KitProducto.destroy({
            where: {},
            transaction
        });

        // Paso 2: Eliminar todos los kits
        await Kit.destroy({
            where: {},
            transaction
        });

        // Paso 3: Eliminar todas las suscripciones
        await newSuscripcion.destroy({
            where: {},
            transaction
        });

        // Paso 4: Reiniciar las secuencias para autoincremento
        await sequelize.query('ALTER SEQUENCE suscripcions_id_seq RESTART WITH 1', { transaction });
        await sequelize.query('ALTER SEQUENCE kits_id_seq RESTART WITH 1', { transaction });
        await sequelize.query('ALTER SEQUENCE kit_productos_id_seq RESTART WITH 1', { transaction });

        // Confirmar la transacción
        await transaction.commit();
        return { message: 'Todas las suscripciones, kits y productos eliminados, autoincremento reiniciado.', status: 200 };
    } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        throw new Error('Error al eliminar todas las suscripciones: ' + error.message);
    }
}

export default { createSubswithKit, resetAllSubscriptions, cancelSubscription }
