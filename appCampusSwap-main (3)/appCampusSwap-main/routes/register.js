var express = require('express');
var router = express.Router();
var database = require('../database');
var {  
    hasNumber,
    hasLowerCase,
    hasUpperCase,
    hasSpecialCharacter,
    hasMinLength } = require('../public/javascript/comprobaciones');

/* GET register form */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'registro de nuevos usuarios', errors: {}, values: {} });
});

router.post("/", async function(req, res, next) {
    let name = req.body.name;
    let surname = req.body.surname;
    let username = req.body.username;
    let psw = req.body.password;
    let email = req.body.email;

    // Validaciones
    let errors = {};
    if (!hasNumber(psw)) errors.password = 'La contraseña debe tener al menos un número.'; 
    if (!hasLowerCase(psw)) errors.password = 'La contraseña debe tener al menos una letra minúscula.';
    if (!hasUpperCase(psw)) errors.password = 'La contraseña debe tener al menos una letra mayúscula.';
    if (!hasSpecialCharacter(psw)) errors.password = 'La contraseña debe tener al menos un carácter especial.';
    if (!hasMinLength(psw)) errors.password = 'La contraseña debe tener al menos 8 caracteres.';
    try {
        if (await database.EmailExists(email)) errors.email = 'Correo asignado a otro usuario';
        if (await database.UserExists(username)) errors.username = 'Nombre de usuario ya en uso';
    } catch (err) {
        next(err); // Manejo de errores para bd
    }

    // Si hay errores, devolver la página con los errores y los valores válidos
    if (Object.keys(errors).length > 0) {
        return res.render('register', {
            title: 'registro de nuevos usuarios',
            errors,
            values: { name, surname, username, email }
        });
    }

    // Si no hay errores, insertar usuario en la base de datos
    try {
        await database.insertUser(name, surname, username, psw, email);
        res.redirect("/login");
    } catch (err) {
        next(err); // Manejo de errores para bd
    }
});

module.exports = router;
