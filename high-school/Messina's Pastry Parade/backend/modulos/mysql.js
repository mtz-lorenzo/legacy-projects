//Sección MySQL del código
const mySql = require("mysql2/promise");

/**
 * Objeto con la configuración de la base de datos MySQL a utilizar.
 */
require('dotenv').config(); // Carga las variables del archivo .env

const SQL_CONFIGURATION_DATA = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "juego_db",
    port: process.env.DB_PORT || 3306,
    charset: 'UTF8_GENERAL_CI'
};

/**
 * Realiza una query a la base de datos MySQL indicada en el archivo "mysql.js".
 * @param {String} queryString Query que se desea realizar. Textual como se utilizaría en el MySQL Workbench.
 * @returns Respuesta de la base de datos. Suele ser un vector de objetos.
 */
exports.realizarQuery = async function (queryString, params = []) {
    let returnObject;
    let connection;
    try {
        connection = await mySql.createConnection(SQL_CONFIGURATION_DATA);
        returnObject = await connection.execute(queryString, params);
    } catch (err) {
        console.log(err);
        throw err;
	} finally {
    	if (connection) {
        	try { await connection.end(); } catch (e) { /* ya cerrada */ }
    	}
	}
    return returnObject[0];
};