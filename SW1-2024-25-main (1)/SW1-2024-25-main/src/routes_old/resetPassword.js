var express = require('express');
var router = express.Router();

/* GET reset pswd page. */
router.get('/', (req, res, next) => {
    res.render('resetPassword', { title: 'Reiniciar Contraseña', currentPage: 'reset_password' })
});

module.exports = router;