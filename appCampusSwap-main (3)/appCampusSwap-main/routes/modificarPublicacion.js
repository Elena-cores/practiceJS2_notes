var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/', async function(req, res, next) {
    const from = req.query.from || 'perfil'; // obtener parametro 'from' de la url
    const id_ad = req.query.id_ad; //obtener ID anuncio
    try{
        const adData = await database.getAdById(id_ad);
        res.render('modificarPublicacion', { title: 'Modificar Publicación', from: from, id_ad: id_ad, adData: adData});
    }catch (error) {
        console.error('Error en recuperar datos del producto:', error);
        res.status(500).send('Error del servidor');
    }
});

router.post("/", function(req, res, next) {
    let title = req.body.title;
    let description = req.body.description;
    let price = parseFloat(req.body.price); 
    let state = req.body.state; 
    let university = req.body.university;
    let id_ad = req.body.id_ad;
    let userId = req.session.userId;

    // Verificar si userId existe
    if (!userId) {
        console.error("Error: No hay ID de usuario en la sesión");
        res.redirect("/login");
        return;
    }

    async function updateAd() {
        try {
            await database.updateAds(title, description, price, state, university, userId, id_ad);
            res.redirect("/perfil");
        } catch (error) {
            console.error("Error al modificar el anuncio:", error);
            res.status(500).send("Error al modificar el anuncio.");
        }
    }

    updateAd();
});
module.exports = router;
