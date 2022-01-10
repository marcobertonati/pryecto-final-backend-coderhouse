/*Creo servidor */
const express = require("express");

/*Inicializamos express */
const app = express();

/*Le pasamos la constante app que creamos arriba */
const http = require("http").Server(app);

/*Le pasamos la constante http */
const io = require("socket.io")(http);

/*Cargo módulo Handlebars */
const handlebars = require("express-handlebars");

/*Requiero cors */
const cors = require("cors");
app.use(cors());

/*Requiero compression*/
const compression = require("compression");
app.use(compression());

/*Requiero Multer para manejo de archivos*/
const multer = require("multer");
const storageMulter = multer.diskStorage({
  destination: "public/avatar",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
app.use(
  multer({
    storage: storageMulter,
    dest: "public/avatar",
  }).single("avatar")
);

/*Requiero passport para AUTH */
const passport = require("passport");

/*Requiero Session*/
const session = require("express-session");

/*Requiero CookieParser */
const cookieParser = require("cookie-parser");

/*Requiero Mongo Store para guardar sesiones */
const MongoStore = require("connect-mongo");

/*Configuración para Mongo Atlas */
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

/*Establecemos que la sessión se guarde en MongoStore */
const {
  MONGO_URI,
  SECRET_SESSION,
  EXPIRATION_SESSION,
} = require("./src/config/globals");
const sessionMiddleware = session({
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    mongoOptions: advancedOptions,
    ttl: 600,
  }),
  secret: SECRET_SESSION,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: Number(EXPIRATION_SESSION),
  },
});

app.use(sessionMiddleware);
app.use(cookieParser());

/*Middleware Passport: SIEMPRE VAN ANTES QUE LAS RUTAS */
app.use(passport.initialize());
app.use(passport.session());

/*Body Parser */
const bodyParser = require("body-parser");
/*Uso de Middlewares*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(express.json()); // Por algun motivo extraño el express.json() no me estaría funcionando

/*---------------------*/
/* MOTOR DE PLANTILLAS */
/*---------------------*/
/*Configuración del motor de plantilla*/
app.engine(
  "hbs",
  handlebars({
    extname: "hbs", // Extension a utilizar
    defaultLayout: "main.hbs", // El layout que va a cargar en todas las paginas por default
    layoutsDir: `./views/layouts`, // Donde se van a encontrar las layouts
    partialsDir: `./views/partials/`, // Donde se van a encontrar los partials
  })
);
// Estableciendo el motor de plantilla que se utiliza
app.set("view engine", "hbs");
// Estableciendo el directorio donde se encuentran los archivos de plantillas
app.set("views", "./views");

/*---------------------*/
/* ARCHIVOS ESTÁTICOS  */
/*---------------------*/
// Utilizamos el prefijo virtual '/static'
app.use("/static", express.static(__dirname + "/public"));
/*Rutas para probar que archivos sirve:
http://localhost:8080/static/css/style.css
http://localhost:8080/static/js/index.js
*/

/*-----------------*/
/*     ROUTER      */
/*-----------------*/
/*Importamos rutas */
/*El app.use de todas las rutas deberá ir al final de toda la configuración del código */
const routesConfig = require("./src/routes/index");
routesConfig(app);
/*Socket.io: Chat */
/*Requiero la funcion socketIo que lo que contiene adentro es toda la conexión IO. Le paso por parametro el io que es basicamente la que establece la conexión. */
const socketConnection = require("./src/services/messagesIOchat");
socketConnection(io, sessionMiddleware);
/*GraphQL */
const graphqlHTTP = require("./src/graphql/config/graphql.config");
app.use("/graphql", graphqlHTTP);
/* Todas las rutas que no sean matcheadas por el servidor renderizará un html 404 */
app.get("*", (req, res, next) => {
  res.status(404).render("./pages/not-founded");
});

/*--------------------*/
/*Exportamos servidor */
module.exports = http;
