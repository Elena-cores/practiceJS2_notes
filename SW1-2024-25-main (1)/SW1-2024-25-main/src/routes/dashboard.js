const express = require('express');
const router = express.Router();
const Database = require('../db/connection');

const db = new Database();

router.use((req, res, next) => {
    res.locals.css = 'dashboard';
    next();
});

// Ruta principal (dashboard)
router.get('/', async (req, res) => {
    try{

        // Apuntes en la ultima semana
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const newNotes = await db.getCollection('Notes').countDocuments({ createdAt: { $gte: oneWeekAgo } });

        // Últimos 4 usuarios
        const recentUsers = await db.getCollection('User')
            .find({}, { projection: { username: 1, imagelink: 1 } })
            .sort({ _id: -1 }) // Más recientes primero
            .limit(4)
            .toArray();

        // 10 alertas más recientes
        const alerts = await db.getRecentAlerts(10);


        res.render('dashboard', { title: 'Dashboard', currentPage: 'dashboard', newNotes, recentUsers, alerts });

    } catch (error) {
        console.error("Error al obtener datos del dashboard:", error);
        res.render('dashboard', { title: 'Dashboard', currentPage: 'dashboard', newNotes: 0, recentUsers: [], alerts: [] });
    }
});

// Endpoint para cargar más alertas
router.get('/alertas/more', async (req, res) => {
    const { skip } = req.query;
    try {
        const alerts = await db.getRecentAlerts(10, parseInt(skip));
        res.json(alerts);
    } catch (error) {
        console.error('Error fetching more alerts:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para alertas
router.get('/alertas', (req, res) => {
    res.render('alertas', { title: 'Alertas', currentPage: 'alertas' });
});

// Ruta para reportedUsers
router.get('/reportedUsers', async (req, res) => {
    try {
        const reportedUsers = await db.getReportedUsers(0, 10);
        res.render('reportedUsers', { title: 'Usuarios Reportados', currentPage: 'reportedUsers', reportedUsers });
    } catch (error) {
        console.error('Error fetching reported users:', error);
        res.render('reportedUsers', { title: 'Usuarios Reportados', currentPage: 'reportedUsers', reportedUsers: [] });
    }});

// Ruta para moreReportedUsers
router.get('/reportedUsers/more', async (req, res) => {
    const { skip } = req.query;
    const limit = 10; // Número de usuarios por solicitud
    try {
        const reportedUsers = await db.getReportedUsers(parseInt(skip, 10), limit);
        res.json(reportedUsers);
    } catch (error) {
        console.error('Error fetching more reported users:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para users
router.get('/users', async (req, res) => {
    try {
        const users = await db.getUsers();
        res.render('users', { title: 'Lista de Usuarios', currentPage: 'users', users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.render('users', { title: 'Lista de Usuarios', currentPage: 'users', users: [] });
    }
});

router.get('/users/more', async (req, res) => {
    const { skip } = req.query;
    console.log('Skip:', skip);
    try {
        const users = await db.getUsers(parseInt(skip));
        console.log('More users:', users);
        res.json(users);
    } catch (error) {
        console.error('Error fetching more users:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
