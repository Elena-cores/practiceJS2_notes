const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('restricted', {user: req.session.user, title:req.app.locals.storeName});
});

module.exports = router;
