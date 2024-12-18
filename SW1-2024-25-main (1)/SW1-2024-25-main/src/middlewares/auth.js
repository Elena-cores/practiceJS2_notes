function isAuthenticated(req, res, next) {
    if (!req.session.mainUser) {
        req.session.error = "Debes iniciar sesión para acceder a esta página.";
        return res.redirect('/');
    }
    
    req.session.user = req.session.mainUser;

    next();
}

function isAdmin(req, res, next) {
    if (!req.session.user || !req.session.user.admin) {
        req.session.error = "No tienes permisos para acceder a esta página.";
        return res.redirect('/');
    }
    next();
}

module.exports = { isAuthenticated, isAdmin };