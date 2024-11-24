const sequelize = require('../config/database');
const newSuscripcion = require('../models/suscripcion');
const Kit = require('../models/kit');
const KitProducto = require('../models/kit_producto');
const Cliente = require('../models/cliente');
const Receta = require('../models/receta');

const getNextMonthFirstDay = () => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return nextMonth;
};

const createSubswithKit = async (payload) => {
    const { userId, subsType, totalCartPrice, recetaLink, cartProducts } = payload;
    const months = subsType === '3meses' ? 3 : subsType === '6meses' ? 6 : 12;
    const totalSubs = totalCartPrice * months;
    const deliveryDate = getNextMonthFirstDay();

    const transaction = await sequelize.transaction();

    try {
        const cliente = await Cliente.findOne({ where: { idUsuario: userId } });
        if (!cliente) {
            throw new Error(`No se encontró un cliente asociado con el userId ${userId}`);
        }

        let receta = null;
        if (recetaLink) {
            receta = await Receta.create(
                {
                    imagen: recetaLink,
                    idCliente: cliente.id,
                },
                { transaction }
            );
        }

        const newSubs = await newSuscripcion.create(
            {
                tipo: subsType,
                precio: totalSubs,
                idCliente: cliente.id,
                estado: true,
            },
            { transaction }
        );

        const newKit = await Kit.create(
            {
                idSuscripcion: newSubs.id,
                fecha: deliveryDate,
            },
            { transaction }
        );

        const kitProduct = cartProducts.map((product) => ({
            idProducto: product.productId,
            idKit: newKit.id,
            idReceta: receta ? receta.id : null,
            cantProducto: product.cantidad * months,
        }));
        await KitProducto.bulkCreate(kitProduct, { transaction });

        await transaction.commit();

        return { message: 'Subscripción creada con éxito.', id: newSubs.id, status: 200 };
    } catch (error) {
        await transaction.rollback();
        throw new Error('Error en la creación de la subscripción: ' + error.message);
    }
};

const cancelSubscription = async (subscriptionId) => {
    try {
        const suscripcion = await newSuscripcion.findOne({ where: { id: subscriptionId } });

        if (!suscripcion) {
            throw new Error('Suscripción no encontrada.');
        }

        await newSuscripcion.update(
            { estado: false },
            { where: { id: subscriptionId } }
        );

        return { message: 'Suscripción cancelada con éxito.', status: 200 };
    } catch (error) {
        throw new Error('Error al cancelar la suscripción: ' + error.message);
    }
};

const resetAllSubscriptions = async () => {
    const transaction = await sequelize.transaction();

    try {
        await KitProducto.destroy({
            where: {},
            transaction,
        });

        await Receta.destroy({
            where: {},
            transaction,
        });

        await Kit.destroy({
            where: {},
            transaction,
        });

        await newSuscripcion.destroy({
            where: {},
            transaction,
        });

        await transaction.commit();
        return {
            message: 'Todas las suscripciones, kits, productos y recetas eliminados.',
            status: 200,
        };
    } catch (error) {
        await transaction.rollback();
        throw new Error('Error al eliminar todas las suscripciones: ' + error.message);
    }
};

module.exports = { createSubswithKit, resetAllSubscriptions, cancelSubscription };
