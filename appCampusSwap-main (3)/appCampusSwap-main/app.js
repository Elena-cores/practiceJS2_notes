var express = require('express');   // importar framework Express
var createError = require('http-errors');   // módulo para manejar errores HTTP
var path = require('path');     //modulo para manejar rutas de archivos
var http = require('http');
var socketIo = require('socket.io');
var session = require('express-session');

var indexRouter = require('./routes/index');
var logoutRouter = require('./routes/logout');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var listadoRouter = require('./routes/listado');
var perfilRouter = require('./routes/perfil');
var favoritosRouter = require('./routes/favoritos');
var buzonRouter = require('./routes/buzon');
var valoracionesRouter = require('./routes/valoraciones');
var olvidadoRouter = require('./routes/olvidado');
var modificarRouter = require('./routes/modificar');
var nuevaPublicacionRouter = require('./routes/nuevaPublicacion');
var modificarPublicacionRouter = require('./routes/modificarPublicacion');
var ajustesRouter = require('./routes/ajustes');
var aboutRouter = require('./routes/about');
var isAuthenticated = require('./middleware/authMiddleware');
const cors = require('cors')

var app = express();
var port = process.env.PORT || 3000;

app.use(cors())


// Configuración del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(session({
  secret: 'tu_secreto_aqui', // Cambia esto por un secreto más seguro
  resave: false,
  saveUninitialized: true
}));

app.use(express.json());    
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', indexRouter);
app.use('/logout', logoutRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/olvidado', olvidadoRouter);
app.use('/about', aboutRouter);

app.use('/listado', isAuthenticated, listadoRouter);
app.use('/perfil', isAuthenticated, perfilRouter);
app.use('/favoritos', isAuthenticated, favoritosRouter);
app.use('/buzon', isAuthenticated, buzonRouter);
app.use('/valoraciones', isAuthenticated, valoracionesRouter);
app.use('/nuevaPublicacion', isAuthenticated, nuevaPublicacionRouter);
app.use('/modificarPublicacion', isAuthenticated, modificarPublicacionRouter);
app.use('/modificar', isAuthenticated, modificarRouter);
app.use('/ajustes', isAuthenticated, ajustesRouter);

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// Manejo de errores 404 y reenvío al manejador de errores
// Si no se encuentra la ruta, se pasa un error 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  // Definir locales, solo proporcionar errores en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Renderizar la página de error
  res.status(err.status || 500);
  res.render('error');
});



// Crear el servidor HTTP
const server = http.createServer(app);
const io = socketIo(server);

app.set('io', io);

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
    });
});

// Escuchar en el puerto
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

server.on('error', (error) => {
  if (error.syscall !== 'listen') throw error;
  const bind = `Port ${port}`;

  // Manejar errores específicos de puerto
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requiere privilegios elevados`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} ya está en uso`);
      process.exit(1);
      break;
    default:
      throw error;
    }
});

module.exports = app;
