const express = require('express');
const bcrypt = require('bcrypt');
const Database = require('../db/connection');
const router = express.Router();

const dbInstance = new Database();

// Registro de usuario
router.post('/register', async (req, res) => {
    var { username, email, faculty, degree, password } = req.body;
    email = email.toLowerCase();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            "username": username,
            "password": hashedPassword,
            "email": email,
            "degree": degree,
            "degreeyear": 1,
            "university": "CEU San Pablo",
            "faculty": faculty,
            "description": "Nuevo usuario",
            "imagelink": "../images/users/default.jpg",
            "admin": false,
            "isBanned": false
        };

        const insert = await dbInstance.insertUser(newUser);
        req.session.message = "Usuario registrado con éxito. Por favor, inicia sesión.";
        req.session.mainUser = newUser;
        return res.json({ success: "Usuario registrado con éxito." });
    } catch (error) {
        console.error("Error en el registro:", error);
        req.session.error = "Hubo un problema con el registro. Inténtalo de nuevo.";
        return res.json({ error: "Ha ocurrido un error, inténtelo de nuevo más tarde" });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    var { email, password } = req.body;
    email = email.toLowerCase();

    try {
        const user = await dbInstance.getUserByEmail(email);

        if (!user) {
            req.session.error = "Usuario no encontrado.";
            return res.json({ error: "Error, usuario o contraseña erróneos" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            req.session.error = "Contraseña incorrecta.";
            return res.json({ error: "Error, usuario o contraseña erróneos" });
        }

        req.session.message = `Bienvenido, ${user.username}!`;
        req.session.mainUser = user;
        return res.json({ success: "Inicio de sesión correcto." });
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        req.session.error = "Hubo un problema al iniciar sesión. Inténtalo de nuevo.";
        return res.json({ error: "Ha ocurrido un error, inténtelo de nuevo más tarde" });
    }
});

// Cierre de sesión
router.post('/logout', (req, res) => {
    req.session.destroy();
    return res.json({ success: "Sesión cerrada correctamente." });
});

router.post('/send-code', async (req, res) => {
    var { email } = req.body;
    email = email.toLowerCase();

    try {
        const user = await dbInstance.getUserByEmail(email);

        if (!user) {
            req.session.error = "Usuario no encontrado.";
            return res.json({ error: "Error, usuario no encontrado." });
        }

        const code = 123456; // Código de verificación de 6 dígitos
        req.session.code = code;
        req.session.message = "Código de verificación enviado a tu correo electrónico.";
        return res.json({ success: "Código de verificación enviado." });
    } catch (error) {
        console.error("Error enviando código de verificación:", error);
        req.session.error = "Hubo un problema al enviar el código de verificación. Inténtalo de nuevo.";
        return res.json({ error: "Ha ocurrido un error, inténtelo de nuevo más tarde" });
    }
});

router.post('/reset-password', async (req, res) => {
    var { email, code, newPassword } = req.body;
    email = email.toLowerCase();

    console.log(req.session.code, code);
    console.log(req.session.code == code);

    if (req.session.code == code) {
        req.session.message = "Código de verificación correcto.";
    } else {
        req.session.error = "Código de verificación incorrecto.";
        return res.json({ error: "Código de verificación incorrecto." });
    }
    

    try {
        dbInstance.updatePassword(email, newPassword);
    } catch (error) {
        console.error("Error actualizando la contraseña:", error);
        req.session.error = "Hubo un problema al actualizar la contraseña. Inténtalo de nuevo.";
        return res.json({ error: "Ha ocurrido un error, inténtelo de nuevo más tarde" });
    }

    return res.json({ success: "Contraseña actualizada correctamente" });
});

module.exports = router;
