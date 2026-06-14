// Importa la librería para MySQL
const mysql = require('mysql2');
require('dotenv').config();

// Crea la conexión con la base de datos usando las variables de .env
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Intenta conectarse
connection.connect((error) => {
    if (error) {
        console.log("Error de conexión:", error.message);
        return;
    }

    console.log("Conectado a MySQL (base de datos Gestor)");
});

// Exporta la conexión
module.exports = connection;