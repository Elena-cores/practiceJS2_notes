var express = require('express');
var router = express.Router();

/* GET users page. */
router.get('/', (req, res) => {
    res.locals.isAdmin = true;
    res.render('users', { title: 'Usuarios', css: 'admin', currentPage: 'users' })
});

module.exports = router;