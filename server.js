require('dotenv').config();

const app = require('./src/app.js');
const connectDB = require('./src/config/database.js');

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
    console.info(`Servidor corriendo en puerto ${PORT}`);});
