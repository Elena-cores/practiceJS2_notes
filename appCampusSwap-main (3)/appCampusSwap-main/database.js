const mysql = require("mariadb");

const pool1 = mysql.createPool({
  //host: "100.127.20.104",
  host: "localhost",
  user: "root", 
  password: "root",
  connectionLimit: 20,
  acquireTimeout: 30000
});

const pool2 = mysql.createPool({
  //host: "100.127.20.104",
  host: "localhost",
  user: "root", 
  password: "root",
  connectionLimit: 20,
  acquireTimeout: 30000
});

pool1.getConnection().then(async (conn) => { 
  console.log('conexión establecida');
  setUp(conn);
  conn.end(); 
  console.log("La base de datos está creada");
}).catch((err) => {
    console.log(err);
    console.log('conexión no establecida');
});

function setUp(conn){
  conn.query("CREATE DATABASE IF NOT EXISTS campus CHARACTER SET='utf8' COLLATE='utf8_bin'");
  conn.query("USE campus");
  conn.query("CREATE TABLE IF NOT EXISTS user (id_user INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL "
      + ", surname VARCHAR(50) NOT NULL, username VARCHAR(50) NOT NULL UNIQUE, password VARCHAR(20) NOT NULL "
      + ", email VARCHAR(50) NOT NULL UNIQUE, fechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
   );
  conn.query("CREATE TABLE IF NOT EXISTS ads (id_ad INT PRIMARY KEY NOT NULL AUTO_INCREMENT, title VARCHAR (500) NOT NULL, description VARCHAR(300) NOT NULL"
      + ", price DOUBLE NOT NULL, state ENUM('Disponible', 'Reservado', 'Vendido'), university ENUM('Ninguna', 'CEU', 'UCM', 'UPM'), id_user INT, "
      + "FOREIGN KEY (id_user) REFERENCES user(id_user))"
  );
  conn.query(`
    CREATE TABLE IF NOT EXISTS messages (
        id_message INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        sender_id INT NOT NULL,
        receiver_id INT NOT NULL,
        content TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES user(id_user),
        FOREIGN KEY (receiver_id) REFERENCES user(id_user)
    )`);


    conn.query(`
        CREATE TABLE IF NOT EXISTS favorites (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            ad_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES user(id_user) ON DELETE CASCADE,
            FOREIGN KEY (ad_id) REFERENCES ads(id_ad) ON DELETE CASCADE
        )
    `);

    conn.query(`
        CREATE TABLE IF NOT EXISTS valoraciones (
            id_valoracion INT AUTO_INCREMENT PRIMARY KEY,
            comprador_id INT NOT NULL,
            vendedor_id INT NOT NULL,
            ad_id INT NOT NULL,
            valoracion TINYINT NOT NULL CHECK (valoracion BETWEEN 1 AND 5),
            comentario TEXT,
            FechaValoracion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (comprador_id) REFERENCES user(id_user) ON DELETE CASCADE,
            FOREIGN KEY (vendedor_id) REFERENCES user(id_user) ON DELETE CASCADE,
            FOREIGN KEY (ad_id) REFERENCES ads(id_ad)
        )
    `);

    conn.query(
        `CREATE TABLE IF NOT EXISTS ventas (
            id_venta INT AUTO_INCREMENT PRIMARY KEY,
            id_vendedor INT NOT NULL,
            id_comprador INT NOT NULL,
            id_anuncio INT NOT NULL,
            valoracion  BOOLEAN DEFAULT FALSE,
            fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_vendedor) REFERENCES user(id_user),
            FOREIGN KEY (id_comprador) REFERENCES user(id_user),
            FOREIGN KEY (id_anuncio) REFERENCES ads(id_ad)
        )
   `);

}
function insertUser(name, surname, username, password, email) {
  pool2.getConnection().then((conn) => {
      conn.query("USE campus");
      let sql = `INSERT INTO user (name, surname, username, password, email) 
                 VALUES ('${name}', '${surname}', '${username}', '${password}', '${email}')`;

      return conn.query(sql).then(() => {
          console.log("Usuario insertado con éxito");
      }).catch(err => {
          console.error("Error al insertar usuario:", err.message);
      }).finally(() => {
          conn.end();
      });
  }).catch((err) => {
      console.error("No se pudo conectar a la base de datos:", err.message);
  });
}

function insertAds(title, description, price, state, university, id_user) {
  pool2.getConnection().then((conn) => {
      conn.query("USE campus");
      console.log(id_user);
      let sql = `INSERT INTO ads (title, description, price, state, university, id_user) 
                 VALUES ('${title}',
                        '${description}', 
                         ${price}, 
                         '${state}', 
                         '${university}', 
                         ${id_user})`;

      conn.query(sql).then(() => {
          console.log(`Anuncio registrado con éxito para el usuario con ID: ${id_user}`);
          // Consulta adicional para verificar
          return conn.query(`SELECT a.*, u.username 
                           FROM ads a 
                           JOIN user u ON a.id_user = u.id_user 
                           WHERE a.id_user = ${id_user} 
                           ORDER BY a.id_ad DESC LIMIT 1`);
      }).then((result) => {
          if(result.length > 0) {
              console.log('Detalles del anuncio insertado:');
              console.log(`- ID del anuncio: ${result[0].id_ad}`);
              console.log(`- Título: ${result[0].title}`);
              console.log(`- Descripción: ${result[0].description}`);
              console.log(`- Precio: ${result[0].price}`);
              console.log(`- Usuario: ${result[0].username} (ID: ${result[0].id_user})`);
          }
      }).catch(err => {
          console.error("Error al insertar anuncio:", err.message);
      }).finally(() => {
          conn.end();
      });
  }).catch((err) => {
      console.error("No se pudo conectar a la base de datos:", err.message);
  });
}

function updateAds(title, description, price, state, university, id_user, id_ad) {
    pool2.getConnection().then((conn) => {
        conn.query("USE campus");
        let sql = `UPDATE ads SET title = '${title}',
                    description = '${description}',
                    price = ${price},
                    state = '${state}',
                    university = '${university}',
                    id_user = ${id_user}
                    WHERE id_ad = ${id_ad}`;
  
        conn.query(sql).then(() => {
            console.log(`Anuncio modificado con éxito para el usuario con ID: ${id_user}`);
            // Consulta adicional para verificar
            return conn.query(`SELECT * 
                             FROM ads   
                             WHERE id_ad = ${id_ad}`);
        }).then((result) => {
            if(result.length > 0) {
                console.log('Detalles del anuncio modificado:');
                console.log(`- ID del anuncio: ${result[0].id_ad}`);
                console.log(`- Título: ${result[0].title}`);
                console.log(`- Descripción: ${result[0].description}`);
                console.log(`- Precio: ${result[0].price}`);
                console.log(`- Estado: ${result[0].state}`);
                console.log(`- Universidad: ${result[0].university}`);
                console.log(`- ID Usuario: ${result[0].id_user}`);
            }
        }).catch(err => {
            console.error("Error al modificar anuncio:", err.message);
        }).finally(() => {
            conn.end();
        });
    }).catch((err) => {
        console.error("No se pudo conectar a la base de datos:", err.message);
    });
  }

// Nueva función para obtener los anuncios de un usuario específico
function getAdsByUser(id_user) {
  return pool2.getConnection().then((conn) => {
      conn.query("USE campus");
      return conn.query(`SELECT * FROM ads WHERE id_user = ${id_user}`).then((rows) => {
          conn.end();
          return rows;
      });
  }).catch((err) => {
      console.error("Error al obtener anuncios del usuario:", err.message);
      return [];
  });
}

//Función para obtener un anuncio en particular
function getAdById(id_ad){
    return pool2.getConnection().then((conn) => {
        conn.query("USE campus");
        return conn.query(`SELECT * FROM ads WHERE id_ad = ${id_ad}`).then((rows) => {
            conn.end();
            return rows;
        });
    }).catch((err) => {
        console.error("Error al obtener el anuncios:", err.message);
        return [];
    });
}

function getValutation(id_user){
    return pool2.getConnection().then((conn) => {
        conn.query("USE campus");
        return conn.query(`SELECT valoracion FROM valoraciones WHERE vendedor_id = ${id_user}`).then((rows) => {
            conn.end();
            let suma = 0;
            for(let i=0; i<rows.length; i++){
                suma += rows[i].valoracion;
            }
            return (suma/rows.length);
        });
    }).catch((err) => {
        console.error("Error al obtener la valoracion media:", err.message);
        return [];
    });
}

function deleteAd(adId, userId) {
  return pool2.getConnection().then((conn) => {
      conn.query("USE campus");
      return conn.query('DELETE FROM ads WHERE id_ad = ? AND id_user = ?', [adId, userId])
      .then((result) => {
          conn.end();
          return result.affectedRows > 0;
      });
  }).catch((err) => {
      console.error("Error al eliminar anuncio:", err.message);
      return false;
  });
}


async function updateUser(password, email) {
    try {
        const conn = await pool2.getConnection();
        await conn.query("USE campus");
        const result = await conn.query("UPDATE user SET password = ? WHERE email = ?", [password, email]);
        conn.release();
        return result;
    } catch (error) {
        console.error("Error updating password:", error);
        throw error;
    }
}

async function updateVendido(adId, userId) {
    try {
        const conn = await pool2.getConnection();
        await conn.query("USE campus");
        const result = await conn.query("UPDATE ads SET state = 'Vendido' WHERE id_ad = ? AND id_user = ?", [adId, userId]);
        conn.release();
        return result.affectedRows > 0; 
    } catch (error) {
        console.error("Error al marcar anuncio como vendido:", error);
        throw error;
    }
}

function mostrarUsuariosConversacionesAbiertas(userId) {
    return pool2.getConnection().then(conn => {
        conn.query("USE campus");
        return conn.query(`
            SELECT DISTINCT u.id_user, u.username
            FROM messages m
            JOIN user u ON u.id_user = m.receiver_id OR u.id_user = m.sender_id
            WHERE (m.sender_id = ? OR m.receiver_id = ?) AND u.id_user != ?
        `, [userId, userId, userId]).then(rows => {
            conn.end();
            return rows;
        });
    }).catch(err => {
        console.error('Error al obtener usuarios:', err.message);
        return [];
    });
}

function registrarVenta(adId, sellerId, buyerId) {
    return pool2.getConnection().then(conn => {
        conn.query("USE campus");
        return conn.query(`
            INSERT INTO ventas (id_anuncio, id_vendedor, id_comprador)
            VALUES (?, ?, ?)
        `, [adId, sellerId, buyerId]).then(() => {
            conn.end();
            return true;
        });
    }).catch(err => {
        console.error('Error al registrar venta:', err.message);
        return false;
    });
}

function EmailExists(email){
    return pool2.getConnection().then((conn) => {
        conn.query("USE campus");
        return conn.query(`SELECT * FROM user WHERE email = ?`, [email]).then((rows) => {
            conn.end();
            if (rows.length > 0) {
                return true; 
            } else {
                return false;
            }
        });
    }).catch(err => {
        console.error("Error al conectarse con la base de datos", err.message); 
        return false;
    });
}

function UserExists(username){
    return pool2.getConnection().then((conn) => {
        conn.query("USE campus");
        return conn.query(`SELECT * FROM user WHERE username = ?`, [username]).then((rows) => {
            conn.end();
            if (rows.length > 0) {
                return true; 
            } else {
                return false;
            }
        });
    }).catch(err => {
        console.error("Error al conectarse con la base de datos", err.message); 
        return false;
    });
}

module.exports = { pool1, pool2, setUp, insertUser, insertAds, updateAds, getAdsByUser, getAdById, deleteAd, updateUser, updateVendido, mostrarUsuariosConversacionesAbiertas, registrarVenta, EmailExists, UserExists, getValutation };
