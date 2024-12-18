var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Inicio de sesión' });
});

router.post('/', function(req, res, next) {
    let pwd = req.body.password;
    let email = req.body.email; 

    if(email && pwd) {
       database.pool2.getConnection().then(async (conn) => {
        conn.query("USE campus");
        var consulta = await conn.query(`SELECT id_user, username, fechaRegistro FROM user WHERE email ="${email}" AND password = "${pwd}";`);

        if(consulta.length > 0) {
            // Añadir logs para verificar
            console.log("Usuario encontrado:");
            console.log("ID:", consulta[0].id_user);
            console.log("Username:", consulta[0].username);
            console.log("FechaRegistro:", consulta[0].fechaRegistro);

            req.session.userId = consulta[0].id_user;
            req.session.username = consulta[0].username;
            req.session.fechaRegistro = new Date(consulta[0].fechaRegistro).getFullYear();

            // Verificar que se guardó en la sesión
            console.log("Sesión guardada:");
            console.log("Session userId:", req.session.userId);
            console.log("Session username:", req.session.username);
            console.log("Session fecha:", req.session.fechaRegistro);

            conn.end();
            res.redirect("/listado");
        } else {
            console.log("No se encontró el usuario");
            res.redirect("/login");
            conn.end();
        }
    }).catch((err) => {
        console.log(err);
        console.log("Error al intentar iniciar sesión:", err.message);
    });
    } else {
        res.redirect("/login")
    }
});
module.exports = router;