const app = require('./app');
const sequelize = require('./src/config/database');

require('./src/models/associations');

require('./src/services/crono');

async function main() {
    try {
        const init = process.argv[2];

        if (init) {
            await sequelize.sync({ force: true });
        } else {
            await sequelize.sync({ force: false });
        }

        console.log('Database synchronized');

        const port = process.env.PORT || 3001;

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (error) {
        console.error(error);
    }
}

main();
