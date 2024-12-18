const express = require('express');
const router = express.Router();
const Database = require('../db/connection');

const dbInstance = new Database();

// Middleware to set default CSS
router.use((req, res, next) => {
    res.locals.css = 'mainItems';
    next();
});

// Home Page
router.get('/', async (req, res) => {
    try {
        const users = await dbInstance.getCollection('User').find({}).toArray();
        const news = await dbInstance.getCollection('News').find({}).toArray();
        const mainUser = req.session.mainUser || null;
        res.render('index', { title: 'Inicio', currentPage: 'index', users, news, mainUser });
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.render('index', { title: 'Inicio', currentPage: 'index', users: [], news: [], mainUser: null });
    }
});

// Publications Page
router.get('/publication', (req, res) => {
    res.render('publication', { title: 'Publicación', currentPage: 'publication' });
});

// Resources Page
router.get('/resources', (req, res) => {
    res.render('resources', { title: 'Recursos', currentPage: 'resources' });
});

// // Ruta para archivo
// router.get('/', (req, res) => {
//     res.render('', { title: 'Archivos', currentPage: '' });
// });

// // Ruta para alertas
// router.get('/alertas', (req, res) => {
//     res.render('alertas', { title: 'Alertas', currentPage: 'alertas' });
// });

// //Ruta para historial de ventas
// router.get('/', (req, res) => {
//     res.render('', { title: 'Historial de ventas', currentPage: '' });
// });

module.exports = router;