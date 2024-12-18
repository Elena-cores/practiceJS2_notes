var express = require('express');
var router = express.Router();
var database = require('../database');
var isAuthenticated = require('../middleware/authMiddleware');

// Ruta para mostrar la página de ajustes
router.get('/', isAuthenticated, async function(req, res) {
    try {
        const conn = await database.pool2.getConnection();
        await conn.query("USE campus");
        
        // Obtener información actualizada del usuario
        const [user] = await conn.query(
            "SELECT id_user, name, surname, username, email FROM user WHERE id_user = ?", 
            [req.session.userId]
        );
        
        conn.release();

        if (!user) {
            return res.redirect('/login');
        }

        res.render('ajustes', { 
            user: user,
            title: 'Ajustes de Usuario'
        });

    } catch (error) {
        console.error("Error al cargar ajustes:", error);
        res.status(500).render('error', { 
            message: 'Error al cargar la página de ajustes',
            error: error
        });
    }
});

module.exports = router;