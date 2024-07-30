// ¿Que tipo de datos puede guardar?
//A) Id de las sesiones
// B) Preferencias del usuario
// C) Nombres de usuario
// Caracteristicas de las cookies:
// . Se les puede configurar un tiempo de vida.
// . Este archivito se almacena del lado del cliente, en eI navegador,espacio es limitado.
// . Cuidado! No podemos guardar datos sensibles acá.
// . Podemos darle un poco de seguridad con claves o firmas.por 10 tanto el

import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();
const PORT = 8080;

//Middleware
app.use(express.json());
app.use(cookieParser('CoderS3cR3tCoD3'));
app.use(
  session({
    secret: 'secretCoder',
    //Esta configuracion me permite mantener activa la sesion frente a la inactividad del usuario.
    resave: true,
    saveUninitialized: true,
  })
);

//Middleware de autenticacion:
function auth(req, res, next) {
  if (req.session.user === 'tinki' && req.session.admin === true) {
    return next();
  }
  return res.status(401).send('Error de autorizacion');
}

//Rutas
app.get('/', (req, res) => {
  res.send('Hola coders,');
});

app.listen(PORT, () => {
  console.log(`Servidor express corriendo en el puerto ${PORT}`);
});

//SETEAR UNA COOKIE
app.get('/setcookie', (req, res) => {
  //usamos el objeto "res" para asignarle una coockie al cliente
  //res.cookie('coderCookie', 'Mi primera chamba con cookies').send('Cookie seteada!');
  res
    .cookie('coderCookie', 'Mi primera chamba con cookies', { maxAge: 60000 })
    .send('Cookie seteada!');
});

app.get('/leercookie', (req, res) => {
  res.send(req.cookies);
});

app.get('/borrarcookie', (req, res) => {
  res.clearCookie('coderCookie').send('Cookie borrada');
});

app.get('/cookieFirmada', (req, res) => {
  res
    .cookie('cookieFirmada', 'Esto es un mensaje secreto', { signed: true })
    .send('Cookie firmada');
});

app.get('/recuperamoscookiefirmada', (req, res) => {
  //Ahora para recuperar la cookie firmada tengo que utilizar la propiedad:
  //req.signedCookies
  let valorCookie = req.signedCookies.cookieFirmada;
  if (valorCookie) {
    res.send('Cookie recuperada: ' + valorCookie);
  } else {
    res.send('Cookie invalida');
  }
});

//SESIONES: esto nos permite conseguir un almacenamiento de inforamcion del cliente en el servidor. Lo podemos trabajar desde el objeto req. session

//1) Instalamos: npm i express-session
//2) Importamos: import session from "express-session"

app.get('/session', (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(
      'Visitaste este sitio esta cantidad de veces:' + req.session.counter
    );
  } else {
    req.session.counter = 1;
    res.send('Bienvenido por primera vez al sitio');
  }
});

//Eliminamos los datos de la sesion:

app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (!error) res.send('Sesion cerrada');
    else res.send('Tenemos un error');
  });
});

//Login con session:
app.get('/login', (req, res) => {
  let { usuario, pass } = req.query;
  if (usuario === 'tinki' && pass === 'winki') {
    req.session.user = usuario;
    req.session.admin = true;
    res.send('Inicio de sesion exitoso!!');
  } else {
    res.send('Datos incorrectos');
  }
});

app.get('/privado', auth, (req, res) => {
  res.send('Si llegaste hasta aca es porque estas logueado en el sistema');
});
