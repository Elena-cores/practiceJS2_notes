var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/', function(req, res, next) {
    const from = req.query.from || 'perfil'; // obtener parametro 'from' de la url
    res.render('nuevaPublicacion', { title: 'Nueva Publicación', from: from });
});

router.post("/", function(req, res, next) {
    let title = req.body.title;
    let description = req.body.description;
    let price = parseFloat(req.body.price); 
    let state = req.body.state; 
    let university = req.body.university;
    let userId = req.session.userId;
    console.log(req.session);

    // Verificar si userId existe
    if (!userId) {
        console.error("Error: No hay ID de usuario en la sesión");
        res.redirect("/login");
        return;
    }

    async function insertAd() {
        try {
            await database.insertAds(title, description, price, state, university, userId);
            res.redirect("/listado");
        } catch (error) {
            console.error("Error al registrar el anuncio:", error);
            res.status(500).send("Error al registrar el anuncio.");
        }
    }

    insertAd();
});
module.exports = router;
