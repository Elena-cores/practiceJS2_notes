var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al intentar cerrar sesión:", err);
      return res.redirect('/listado');
    }
    res.redirect('/login'); // Redirigir al login una vez cerrada la sesión
  });
});

module.exports = router;