const express = require('express');
const router = express.Router();
const Database = require('../db/connection');
const db = new Database();
const { ObjectId } = require('mongodb');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); 

// Verificar y crear la carpeta uploads si no existe
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Ruta absoluta para evitar errores
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`; // Generar un nombre único
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

router.use((req, res, next) => {
    res.locals.css = 'profile';
    next();
});

// Ruta principal (profile)
router.get('/', async (req, res) => {
    try {
        const notesCollection = db.getCollection('Notes');
        const uploadedNotes = await notesCollection.find({ userId: req.session.user._id }).toArray(); // Obtener las notas del usuario actua
        // Agregar el path absoluto a las rutas de las notas
        const updatedNotes = uploadedNotes.map(note => ({
            ...note,
            notesRoute: `${req.protocol}://${req.get('host')}/${note.notesRoute}` // Ruta absoluta
        }));

        res.render('profile', {
            title: 'Perfil',
            currentPage: 'profile',
            mainUser: req.session.mainUser,
            uploadedNotes: updatedNotes
        });
    } catch (error) {
        console.error('Error cargando las notas:', error);
        res.status(500).send('Error al cargar la página del perfil');
    }
});

// Ruta para resetPassword
router.get('/resetPassword', (req, res) => {
    res.render('resetPassword', { title: 'Reiniciar Contraseña', currentPage: 'resetPassword' });
});

// Ruta para subir archivos y datos adicionales
router.post('/upload', upload.single('uploadedFile'), async (req, res) => {
    try {
        const { title, description, degree, subject, year, price } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No se recibió ningún archivo.' });
        }

        const notesCollection = db.getCollection('Notes');

        // Guardar detalles del archivo y los datos adicionales en MongoDB
        const newNote = {
            userId: req.session.user._id, // ID del usuario que subió el archivo
            title,
            description,
            degree,
            subject,
            year: parseInt(year, 10),
            notesRoute: `uploads/${req.file.filename}`, 
            price: parseFloat(price),
            numPurchases: 0 
        };

        await notesCollection.insertOne(newNote);

        res.json({ success: true, note: newNote });
        return;
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        res.status(500).json({ success: false, message: 'Error al subir el archivo.' });
    }
});

// // Ruta para editar perfil
// router.post('/edit', async (req, res) => {
//     const { username, email, degree, description } = req.body;
//     const userId = req.session.user._id;
//     try {
//         const userCollection = db.getCollection("User");
//         const existingUser = await userCollection.findOne({ _id: new ObjectId(userId) });

//         const updates = {
//             username: username || existingUser.username,
//             email: email || existingUser.email,
//             degree: degree || existingUser.degree,
//             description: description || existingUser.description
//         };

//         await updateUser(userId, updates);
//         Object.assign(req.session.user, updates);
//         res.redirect('/profile');
//     } catch (error) {
//         console.error('Error actualizando el perfil:', error);
//         res.status(500).send('Error al actualizar el perfil');
//     }
// });

router.put('/', async (req, res) => {
    const { field, value } = req.body; // Obtenemos el campo y su nuevo valor
    const userId = req.session.mainUser._id;
    try {
        const updates = { [field]: value };
        await db.updateUser(userId, updates);
        Object.assign(req.session.user, updates);
        res.json({ success: true });
    } catch (error) {
        console.error('Error actualizando el perfil:', error);
        res.status(500).json({ success: false });
    }
});

module.exports = router;