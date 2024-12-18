var express = require('express');
var router = express.Router();
var database = require('../database');
var isAuthenticated = require('../middleware/authMiddleware');

router.get('/', function(req, res, next) {
    res.render('modificar', { title: 'Modificar contraseña' });
});

router.post('/api/change-password', isAuthenticated, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    let userId = req.session.userId;
    try {
        const conn = await database.pool2.getConnection();
        await conn.query("USE campus");
        const [user] = await conn.query("SELECT * FROM user WHERE id_user = ?", [userId]);

        if (!user) {
            conn.release();
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }

        if (user.password !== currentPassword) {
            conn.release();
            return res.status(400).json({ success: false, message: "Contraseña actual incorrecta" });
        }

        if (newPassword === currentPassword) {
            conn.release();
            return res.status(400).json({ success: false, message: "La nueva contraseña no puede ser igual a la contraseña actual" });
        }

        await conn.query("UPDATE user SET password = ? WHERE id_user = ?", [newPassword, userId]);
        conn.release();

        res.json({ success: true, message: "Contraseña cambiada exitosamente" });
    } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
});

module.exports = router;
