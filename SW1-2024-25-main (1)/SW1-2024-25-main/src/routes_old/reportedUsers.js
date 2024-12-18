var express = require('express');
var router = express.Router();

/* GET reported users page. */
router.get('/', (req, res, next) => {
    res.render('reportedUsers', { title: 'Usuarios Repotados', css: 'admin', currentPage: 'reportedUsers' })
});

module.exports = router;