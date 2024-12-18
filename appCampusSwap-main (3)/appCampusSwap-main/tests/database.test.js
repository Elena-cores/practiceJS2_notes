const mariadb = require('mariadb');
const rewire = require('rewire');
const assert = require('assert'); // Para las aserciones básicas

// Rewire para acceder a funciones internas del archivo 'database.js'
const database = rewire('../database.js');

// Extraer las funciones a testear
const pool1 = database.__get__('pool1');
const pool2 = database.__get__('pool2');
const setUp = database.__get__('setUp');
const insertUser = database.__get__('insertUser');
const insertAds = database.__get__('insertAds');

// Pruebas de conexión a la base de datos
describe('Pruebas de Conexión', function () {
    it('Debe conectarse correctamente a la base de datos', async function () {
        let conn;
        try {
            conn = await pool1.getConnection();
            assert(conn, 'La conexión a la base de datos debería estar establecida');
        } catch (err) {
            assert.fail(`Error de conexión a la base de datos: ${err.message}`);
        } finally {
            if (conn) conn.end(); // Cierra la conexión al final
        }
    });
});

// Pruebas de creación de base de datos y tablas
describe('Pruebas de Creación de Base de Datos y Tablas', function () {
    it('Debe crear correctamente la base de datos', async function () {
        let conn;
        try {
            conn = await pool1.getConnection();
            await setUp(conn);

            const dbExist = await conn.query("SHOW DATABASES LIKE 'campus'");
            assert(dbExist.length > 0, 'La base de datos campus debería existir');
        } catch (err) {
            assert.fail(`Error al crear la base de datos: ${err.message}`);
        } finally {
            if (conn) conn.end();
        }
    });

    it('Debe crear correctamente la tabla "user"', async function () {
        let conn;
        try {
            conn = await pool1.getConnection();
            await setUp(conn);

            const tableExist = await conn.query("SHOW TABLES LIKE 'user'");
            assert(tableExist.length > 0, 'La tabla user debería existir');
        } catch (err) {
            assert.fail(`Error al crear la tabla "user": ${err.message}`);
        } finally {
            if (conn) conn.end();
        }
    });

    it('Debe crear correctamente la tabla "ads"', async function () {
        let conn;
        try {
            conn = await pool1.getConnection();
            await setUp(conn);

            const tableExistAds = await conn.query("SHOW TABLES LIKE 'ads'");
            assert(tableExistAds.length > 0, 'La tabla ads debería existir');
        } catch (err) {
            assert.fail(`Error al crear la tabla "ads": ${err.message}`);
        } finally {
            if (conn) conn.end();
        }
    });
});

// Pruebas de inserción de datos
describe('Pruebas de Inserción de Datos', function () {
    // Test 1: Verificar la inserción de un usuario
    it('Debe insertar correctamente un usuario', async function () {
        const name = "maria";
        const surname = "paloma";
        const username = "maria1";
        const password = "maria12";
        const email = "mp@gmail.com";

        let conn;
        let result;
        try {
            await insertUser(name, surname, username, password, email); // Inserta el usuario
            conn = await pool2.getConnection();
            await setUp(conn);

            result = await conn.query(`SELECT * FROM user WHERE email = "${email}";`);
            assert(result.length > 0, 'El usuario debería haber sido insertado en la base de datos');
            assert(result[0].username === username, 'El nombre de usuario debería coincidir');
        } catch (err) {
            assert.fail(`Error al insertar el usuario: ${err.message}`);
        } finally {
            if (conn) conn.end();
        }
    });
});
