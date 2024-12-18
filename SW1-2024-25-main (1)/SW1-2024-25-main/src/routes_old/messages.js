var express = require('express');
var router = express.Router();

/* GET messages. */
router.get('/', (req, res, next) => {
    res.render('messages', { title: 'Mensajes', currentPage: 'messages' })
});

module.exports = router;