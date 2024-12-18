var express = require('express');
var router = express.Router();
const userService = require('./userService');
const db = require('./Connection');

router.get('/', async (req, res) => {
    res.render('profile', {title: 'Perfil', currentPage: 'profile', css: 'profile'});
});

router.get('/editProfile', async (req, res) => {
    res.render('editProfile', {title: 'Editar perfil', currentPage: 'editProfile', css: 'editProfile'});
});

router.post('/editProfile', async (req, res) => {
    const userID = req.params.id;
    const updatedData = req.body; // Para editar perfil
    try {
        await db.connect("ConnectionWeb1");
        // Actualizar el usuario en la base de datos
        const success = await userService.updateUserByID(userID, updatedData);
        if (success) {
            req.session.message = 'Perfil actualizado correctamente';
            res.redirect("/profile");
        } else {
            req.session.error = 'No se pudo actualizar el perfil';
            res.redirect("/profile");
        }
    } catch (error) {
        console.error("Error en la actualización del perfil:", error);
        req.session.error = 'Ocurrió un error inesperado al actualizar el perfil';
        res.redirect("/profile");
    } 
});

module.exports = router;