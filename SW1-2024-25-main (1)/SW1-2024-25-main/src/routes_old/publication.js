var express = require('express');
var router = express.Router();

/* GET publication page. */
router.get('/', (req, res, next) => {
    res.render('publication', { title: 'Publicación', css: 'mainItems', currentPage: 'publication' })
});

module.exports = router;