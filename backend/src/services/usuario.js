
import Usuario from '../models/usuario.js'
const findOneEmail = async (email) => {
    return await Usuario.findOne({
        where: {
            email: email
        }
    });
};



 const service = {findOneEmail}

 export default service