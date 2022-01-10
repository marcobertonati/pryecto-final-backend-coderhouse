/*A través del yargs escuchamos en que puerto se levantará la app. Si es undefined se asignará el puerto 8080 */
const {
  portCLI,
  mongouriCLI,
  notifyMailCLI,
  passMailCLI,
  expirationSessionCLI,
  persistenceCLI,
} = require("yargs").argv;

/*Definimos los valores que pueden llegar a entrar por CLI, si no entran se establecen por defecto */
const PORT = portCLI === undefined ? 8080 : portCLI;
const MONGOURI =
  mongouriCLI === undefined ? process.env.MONGO_URI : mongouriCLI;
const NOTIFYMAIL =
  notifyMailCLI === undefined ? process.env.GMAIL_USER : notifyMailCLI;
const PASSMAIL =
  expirationSessionCLI === undefined
    ? process.env.GMAIL_USER_PASS
    : passMailCLI;
const EXPIRATIONSESSION =
  expirationSessionCLI === undefined
    ? process.env.EXPIRATION_SESSION
    : expirationSessionCLI;
const PERSISTENCE =
  persistenceCLI === undefined ? process.env.PERSISTENCE : persistenceCLI;

module.exports = {
  /*Definidos por CLI, o por default según NODE_ENV */
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: MONGOURI,
  PORT: PORT,
  PERSISTENCE: PERSISTENCE,
  EXPIRATION_SESSION: EXPIRATIONSESSION,
  GMAIL_USER: NOTIFYMAIL,
  GMAIL_USER_PASS: PASSMAIL,

  /* Definido por NODE_ENV */
  IS_CLUSTER: process.env.IS_CLUSTER,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  TWILIO_NUMBER_WHATSAPP: process.env.TWILIO_NUMBER_WHATSAPP,
  SECRET_SESSION: process.env.SECRET_SESSION,

  /*El iniciar sesión con Facebook aún se encuentra en desarrollo */
  FACEBOOK_CLIENT_ID: process.argv[5]
    ? process.argv[5]
    : process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.argv[6]
    ? process.argv[6]
    : process.env.FACEBOOK_CLIENT_SECRET,
};
