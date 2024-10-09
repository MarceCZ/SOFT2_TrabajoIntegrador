import Sequelize from 'sequelize'


const hostname = 'soft2-2024-2-grupo-proyecto-db.postgres.database.azure.com'
const username = 'postgres'
const password = 'Ulima20241'
const database = 'soft2db'
const dbPort = 5432
const dialect = 'postgres'

const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    port: dbPort,
    dialect: dialect,
    operatorAliases: false,
    dialectOptions: {
        ssl: {
            require: true,           // Habilitar SSL
            rejectUnauthorized: false // Si quieres omitir la verificación del certificado
        }
    }
})

export default sequelize;