var express = require('express');
var router = express.Router();
var database = require('../database');
const { pool2 } = require('../database');

function checkAuth(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
}

router.get('/', checkAuth, function(req, res) {
    let userId = req.session.userId;
    database.getValutation(userId).then(valutation => {
        let valoracionMedia="";
        for(let i=0; i<valutation; i++){
          valoracionMedia += "★";
        }
        res.render('valoraciones', {
            title: 'Valoraciones',
            username: req.session.username,
            fechaRegistro: req.session.fechaRegistro,
            activePage: 'valoraciones',
            valoracionMedia: valoracionMedia
        });
      }).catch(error => {
        console.error("Error al obtener media valoraciones:", error);
        res.status(500).send("Error al cargar el perfil.");
      });
});

router.get('/comprado', checkAuth, async function(req, res) {
    let userId = req.session.userId;

    try {
        const conn = await pool2.getConnection();
        await conn.query("USE campus");

        const valoraciones = await conn.query(`
            SELECT v.*, u2.username AS vendedor, a.title AS producto 
            FROM valoraciones v
            JOIN user u2 ON v.vendedor_id = u2.id_user
            JOIN ads a ON v.ad_id = a.id_ad
            WHERE v.comprador_id = ?
            ORDER BY v.FechaValoracion DESC
        `, [userId]);

        conn.release();
        res.json(valoraciones);
    } catch (error) {
        console.error('Error al obtener valoraciones como comprador:', error);
        res.status(500).json({ error: 'Error al obtener las valoraciones como comprador.' });
    }
});

router.get('/vendido', checkAuth, async function(req, res) {
    let userId = req.session.userId;

    try {
        const conn = await pool2.getConnection();
        await conn.query("USE campus");

        const valoraciones = await conn.query(`
            SELECT v.*, u1.username AS comprador, a.title AS producto 
            FROM valoraciones v
            JOIN user u1 ON v.comprador_id = u1.id_user
            JOIN ads a ON v.ad_id = a.id_ad
            WHERE v.vendedor_id = ?
            ORDER BY v.FechaValoracion DESC
        `, [userId]);

        conn.release();
        res.json(valoraciones);
    } catch (error) {
        console.error('Error al obtener valoraciones como vendedor:', error);
        res.status(500).json({ error: 'Error al obtener las valoraciones como vendedor.' });
    }
});

router.get('/noValoradas', checkAuth, async function(req, res) {
    let userId = req.session.userId;

    try {
        const conn = await pool2.getConnection();
        await conn.query("USE campus");

        const comprasNoValoradas = await conn.query(`
            SELECT 
                v.id_venta, 
                u.username AS vendedor, 
                a.title AS producto
            FROM ventas v
            JOIN user u ON v.id_vendedor = u.id_user
            JOIN ads a ON v.id_anuncio = a.id_ad
            WHERE v.id_comprador = ? 
              AND v.valoracion = 0
        `, [userId]);

        conn.release();
        res.json(comprasNoValoradas);
    } catch (error) {
        console.error('Error al obtener compras no valoradas:', error);
        res.status(500).json({ error: 'Error al obtener compras no valoradas.' });
    }
});

router.post('/valorar', checkAuth, async function(req, res) {
    const { idVenta, calificacion, comentario } = req.body;
    let userId = req.session.userId;

    console.log('Datos recibidos:', { idVenta, calificacion, comentario });

    if (!idVenta || !calificacion || !comentario) {
        return res.status(400).json({ error: 'Datos inválidos. Todos los campos son obligatorios.' });
    }

    try {
        const conn = await pool2.getConnection();
        await conn.query("USE campus");

        const venta = await conn.query(`
            SELECT id_vendedor, id_anuncio 
            FROM ventas 
            WHERE id_venta = ? AND id_comprador = ?
        `, [idVenta, userId]);

        if (venta.length === 0) {
            conn.release();
            return res.status(400).json({ error: 'No se encontró la venta o no pertenece al usuario.' });
        }

        const { id_vendedor, id_anuncio } = venta[0];

    
        const valoracionExistente = await conn.query(`
            SELECT COUNT(*) AS total 
            FROM valoraciones 
            WHERE comprador_id = ? AND ad_id = ?
        `, [userId, id_anuncio]);

        if (valoracionExistente[0].total > 0) {
            conn.release();
            return res.status(400).json({ error: 'Ya existe una valoración para esta venta.' });
        }

    
        await conn.query(`
            UPDATE ventas 
            SET valoracion = 1 
            WHERE id_venta = ? AND id_comprador = ?
        `, [idVenta, userId]);

        
        await conn.query(`
            INSERT INTO valoraciones (vendedor_id, comprador_id, ad_id, valoracion, comentario, FechaValoracion)
            VALUES (?, ?, ?, ?, ?, NOW())
        `, [id_vendedor, userId, id_anuncio, calificacion, comentario]);

        conn.release();
        res.json({ message: 'Compra valorada exitosamente.' });
    } catch (error) {
        console.error('Error al valorar la compra:', error);
        res.status(500).json({ error: 'Error al valorar la compra.' });
    }
});

module.exports = router;
