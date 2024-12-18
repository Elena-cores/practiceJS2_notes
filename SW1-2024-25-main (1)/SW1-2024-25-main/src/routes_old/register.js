var express = require('express');
var router = express.Router();
const userService = require('./userService');
const bcrypt = require('bcrypt');
const db = require("./Connection");
/* GET register page. */
router.get('/register', (req, res, next) => {
    res.render('register', { title: 'Registro', currentPage: 'register' })
});

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10); 
        const userData = {
            name,
            email,
            hashedPassword, 
        };
        await db.connect("ConnectionWeb1");
        await userService.createUser(userData).then(_=> console.log(_)).finally(_=> console.log("test"));
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Cerrar la conexión
        await db.close();
    }
});

module.exports = router;