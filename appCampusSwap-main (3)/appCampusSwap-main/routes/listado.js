var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  database.pool2.getConnection().then(async (conn) => {
    conn.query("USE campus");
    const ads = await conn.query('SELECT ads.*, user.username FROM ads JOIN user on ads.id_user = user.id_user;');
    conn.end();
    const adsFiltrado = ads.filter(ad => ad.state === 'Disponible' || ad.state === 'Reservado');
    const adsWithSeller = adsFiltrado.map(ad => ({
        ...ad,
        sellerId: ad.id_user,
        sellerUsername: ad.username
    }));
    // Renderiza la página listado.ejs, pasando los anuncios (ads) obtenidos de la base de datos
    res.render('listado', { 
        title: 'Final catalogue page', 
        ads: adsWithSeller, 
        currentUserId: req.session.userId, 
    });
  }).catch((err) => {
    console.error("Error al recuperar anuncios:", err.message);
    res.status(500).send("Error al recuperar anuncios.");
  });
});


module.exports = router;
