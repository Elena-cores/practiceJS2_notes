var express = require('express');
var router = express.Router();
var database = require('../database');
var express = require('express');
var router = express.Router();
var database = require('../favoritoDatabase');
var database1 = require('../database');

// Obtener los favoritos del usuario
router.get('/', function(req, res, next) {
  let userId = req.session.userId;

  database.getFavoritesByUser(userId).then(ads => {
    database1.getValutation(userId).then(valutation => {
      let valoracionMedia="";
      for(let i=0; i<valutation; i++){
        valoracionMedia += "★";
      }
      const adsFiltrado = ads.filter(ad => ad.state === 'Disponible' || ad.state === 'Reservado');
      const adsWithSeller = adsFiltrado.map(ad => ({
        ...ad,
        sellerId: ad.id_user,
        sellerUsername: ad.seller_username
      }));
      res.render('favoritos', { 
        title: 'Favoritos',
        username: req.session.username,
        fechaRegistro: req.session.fechaRegistro,
        activePage: 'favoritos',
        favorites: adsWithSeller,
        valoracionMedia: valoracionMedia
      });
    }).catch(error => {
      console.error("Error al obtener media valoraciones:", error);
      res.status(500).send("Error al cargar el perfil.");
    });
  }).catch(error => {
    console.error("Error al obtener favoritos del usuario:", error);
    res.status(500).send("Error al cargar los favoritos.");
  });
});

// Agregar o quitar un favorito
router.post('/toggle/:id', function(req, res) {
  let adId = req.params.id;
  let userId = req.session.userId;

  // Primero, verifica si el anuncio ya está en favoritos
  database.getFavoritesByUser(userId).then(favorites => {
    let isFavorite = favorites.some(fav => fav.id_ad === parseInt(adId));
    if (isFavorite) {
      // Eliminar de favoritos
      database.removeFavorite(userId, adId).then(() => {
        res.json({ success: true, message: 'Anuncio eliminado de favoritos.' });
      }).catch(error => {
        console.error("Error al eliminar favorito:", error);
        res.status(500).json({ success: false, message: 'Error al eliminar de favoritos.' });
      });
    } else {
      // Agregar a favoritos
      database.addFavorite(userId, adId).then(() => {
        res.json({ success: true, message: 'Anuncio agregado a favoritos.' });
      }).catch(error => {
        console.error("Error al agregar favorito:", error);
        res.status(500).json({ success: false, message: 'Error al agregar a favoritos.' });
      });
    }
  }).catch(error => {
    console.error("Error al verificar favoritos del usuario:", error);
    res.status(500).json({ success: false, message: 'Error al verificar favoritos.' });
  });
});

module.exports = router;


// Obtener los favoritos del usuario
router.get('/', function(req, res, next) {
  let userId = req.session.userId;

  database.getFavoritesByUser(userId).then(ads => {
    res.render('favoritos', { 
      title: 'Favoritos',
      username: req.session.username,
      favorites: ads
    });
  }).catch(error => {
    console.error("Error al obtener favoritos del usuario:", error);
    res.status(500).send("Error al cargar los favoritos.");
  });
});

// Agregar o quitar un favorito
router.post('/toggle/:id', function(req, res) {
  let adId = req.params.id;
  let userId = req.session.userId;

  // Primero, verifica si el anuncio ya está en favoritos
  database.getFavoritesByUser(userId).then(favorites => {
    let isFavorite = favorites.some(fav => fav.id_ad === parseInt(adId));
    if (isFavorite) {
      // Eliminar de favoritos
      database.removeFavorite(userId, adId).then(() => {
        res.json({ success: true, message: 'Anuncio eliminado de favoritos.' });
      }).catch(error => {
        console.error("Error al eliminar favorito:", error);
        res.status(500).json({ success: false, message: 'Error al eliminar de favoritos.' });
      });
    } else {
      // Agregar a favoritos
      database.addFavorite(userId, adId).then(() => {
        res.json({ success: true, message: 'Anuncio agregado a favoritos.' });
      }).catch(error => {
        console.error("Error al agregar favorito:", error);
        res.status(500).json({ success: false, message: 'Error al agregar a favoritos.' });
      });
    }
  }).catch(error => {
    console.error("Error al verificar favoritos del usuario:", error);
    res.status(500).json({ success: false, message: 'Error al verificar favoritos.' });
  });
});

module.exports = router;
