import cron from 'node-cron';
import UsuarioService from './usuario_kits.js';
import EmailService from './email.js';

//cron.schedule('*/1 * * * *', async () => {
    /*
    console.log('Tarea programada ejecutada a:', new Date().toLocaleString());
    const users = await UsuarioService.findAllComplete();
    users.forEach(user => {
        console.log('Usuario:', user.email);
        user.cliente.suscripcions[0].kits.forEach(kit => {
            console.log('Fecha:', kit.fecha);
            const fechaKit = new Date(kit.fecha);
            const fechaActual = new Date();
            const diferenciaDias = (fechaKit - fechaActual) / (1000 * 60 * 60 * 24);
            if (fechaKit > fechaActual && diferenciaDias <= 30) {
                let idPedido = `${kit.id}`;
                if (idPedido.length < 10) {
                    idPedido = idPedido.padStart(10, '0');
                }
                const fechaFormateadaKit = fechaKit.toLocaleDateString('es-ES'); 
                //EmailService.sendNotificationEmail(user.email,user.cliente.nombre,kit.kit_productos,idPedido,fechaFormateadaKit, kit.dataValues.newTotal);
                console.log('total kit', kit.dataValues.newTotal);
                console.log('fecha', fechaFormateadaKit);
                console.log('id kit', idPedido);
                console.log('Email enviado a:', user.email);
            }
        });
    });
});*/

cron.schedule('0 0 * * *', async () => {
    console.log('Tarea programada ejecutada a:', new Date().toLocaleString());
    const users = await UsuarioService.findAllComplete();
    users.forEach(user => {
        console.log('Usuario:', user.email);
        user.cliente.suscripcions[0].kits.forEach(kit => {
            console.log('Fecha:', kit.fecha);
            const fechaKit = new Date(kit.fecha);
            const fechaActual = new Date();
            const diferenciaDias = (fechaKit - fechaActual) / (1000 * 60 * 60 * 24);
            console.log('Diferencia de dias:', diferenciaDias);
            if (fechaKit > fechaActual && diferenciaDias >= 7 && diferenciaDias < 8) {
                let idPedido = `${kit.id}`;
                if (idPedido.length < 10) {
                    idPedido = idPedido.padStart(10, '0');
                }
                const fechaFormateadaKit = fechaKit.toLocaleDateString('es-ES'); 
                //EmailService.sendNotificationEmail(user.email,user.cliente.nombre,kit.kit_productos,idPedido,fechaFormateadaKit, kit.dataValues.newTotal);
                console.log('total kit', kit.dataValues.newTotal);
                console.log('fecha', fechaFormateadaKit);
                console.log('id kit', idPedido);
                console.log('Email enviado a:', user.email);
            }
        });
    });
});