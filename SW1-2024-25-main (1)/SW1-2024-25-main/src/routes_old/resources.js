var express = require('express');
var router = express.Router();

/* GET resources page. */
router.get('/', (req, res, next) => {
    res.render('resources', { title: 'Recursos', css: 'mainItems', currentPage: 'resources' })
});

module.exports = router;