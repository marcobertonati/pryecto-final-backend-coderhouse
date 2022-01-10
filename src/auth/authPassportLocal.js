const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { createHash, isValidPassword } = require("./bcrypt/bcrypt");
/*Establecemos que persistencia se va a requerir */
const { PERSISTENCE } = require("../config/globals");
const persistenceFactory = require("../dal/factory");
let { persistenceUser } = persistenceFactory.newPersistence(PERSISTENCE);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField:
        "email" /*Esto 3 campos tienen que estar para que funcione */,
      passwordField: "password",
    },
    async function (req, username, password, done) {
      try {
        const userFinded = await persistenceUser.findUserByEmail({
          email: req.body.email,
        });

        if (!userFinded) {
          console.log("No se encontró usuario");
          return done(
            null,
            false,
            console.log("mensaje", "Usuario NO encontrado")
          );
        }

        if (!isValidPassword(req.body.password, userFinded.password)) {
          console.log("Contraseña incorrecta");
          return done(
            null,
            false,
            console.log("mensaje", "Usuario o Contraseña incorrecta")
          );
        }

        return done(null, userFinded);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.use(
  "signup-local",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField:
        "email" /*Esto 3 campos tienen que estar para que funcione */,
      passwordField: "password",
    },
    async function (req, username, password, done) {
      try {
        const userFinded = await persistenceUser.findUserByEmail({
          email: req.body.email,
        });

        if (userFinded) {
          return done(
            null,
            false,
            console.log("mensaje", "Hay un usuario registrado con su mail")
          );
        } else {
          const userToCreate = {
            name: req.body.name,
            lastname: req.body.lastname,
            age: req.body.age,
            number: req.body.number,
            address: req.body.address,
            email: req.body.email,
            avatar: `/static/avatar/${req.file.filename}`,
            password: createHash(req.body.password),
          };

          await persistenceUser.createUser(userToCreate);
          return done(null, userToCreate);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (id, done) {
  try {
    const userFinded = persistenceUser.findUserById(id);
    return done(null, userFinded);
  } catch (err) {
    console.log(err);
  }
});

module.exports = passport;
