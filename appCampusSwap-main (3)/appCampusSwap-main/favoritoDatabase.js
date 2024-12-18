const pool2 = require('./database').pool2;

// add favorito
async function addFavorite(user_id, ad_id) {
    let conn;
    try {
      conn = await pool2.getConnection();
      await conn.query("USE campus");
      await conn.query('INSERT INTO favorites (user_id, ad_id) VALUES (?, ?)', [user_id, ad_id]);
      console.log(`Anuncio ${ad_id} agregado a favoritos para el usuario ${user_id}`);
    } catch (err) {
      console.error("Error al agregar favorito:", err.message);
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }
  
// eliminar favorito
async function removeFavorite(user_id, ad_id) {
    let conn;
    try {
      conn = await pool2.getConnection();
      await conn.query("USE campus");
      await conn.query('DELETE FROM favorites WHERE user_id = ? AND ad_id = ?', [user_id, ad_id]);
      console.log(`Anuncio ${ad_id} eliminado de favoritos para el usuario ${user_id}`);
    } catch (err) {
      console.error("Error al eliminar favorito:", err.message);
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }
  

// Obtener los favoritos de un usuario
async function getFavoritesByUser(user_id) {
    let conn;
    try {
      conn = await pool2.getConnection();
      await conn.query("USE campus");
      const rows = await conn.query(`
        SELECT ads.*, user.username AS seller_username
        FROM ads
        JOIN favorites ON ads.id_ad = favorites.ad_id
        JOIN user ON ads.id_user = user.id_user
        WHERE favorites.user_id = ?`, [user_id]);
      return rows;
    } catch (err) {
      console.error("Error al obtener favoritos del usuario:", err.message);
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

module.exports = { addFavorite, removeFavorite, getFavoritesByUser };
