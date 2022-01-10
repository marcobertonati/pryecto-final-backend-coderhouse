# UNIQUE | Proyecto Final Backend Server Side Rendering 🛒

App deployada en:
```
https://proyecto-final-backend-ch.herokuapp.com/
```


## ¿Cómo funciona? 🤔

La app busca tener un user flow bastante simple para lograr ventas rápidas ¡Chequea el link para que veas como funciona!
```
https://drive.google.com/drive/folders/1K4DKFYXskUpt03Nn8TiOTfjNh7g7yOJy?usp=sharing
```


## Desarrollo 💻

La aplicación se desarrolla en **NodeJS** utilizando el framework **Express** y como base de datos **MongoDB** en su versión online **MongoAtlas**.

Para la autenticación y la autorización utilizamos el modulo de **passport-local**, combinando la encriptación de las contraseñas con **bcrypt**.

Las notificaciones al correo electrónico las manejamos con **nodemailer** y las correspondientes a SMS y Whatsapp con **twilio**.

El chat está implementado en base a la tecnología **Websocket (socket.io)**.

Utilzamos con generador de vista **Handlesbars**.

__También utiliza las siguientes tecnologías__:
* axios
* body-parser
* compression
* cors
* cookie-parser
* graphql
* multer
* yargs


## Reminder de como visualizar el proyecto 💡

¡Es muy simple! Recuerda crear tu carpeta del proyecto con el nombre Unique. 

Luego ejecuta una terminal y encuentrate parado en dicha carpeta. 

Clona este repositorio a través del siguiente comando:

```
git clone https://github.com/marcobertonati/pryecto-final-backend-coderhouse.git
```

Una vez clonado solo deberás instalar todas las dependencias:

```
npm install
```

Deberás crear 2 variables de entorno para poder ejecutar la app en ambos ambientes:
* development.env
* production.env

Chequear en .env.example lo necesario para correr correctamente la aplicación:
```
//.env EXAMPLE
NODE_ENV=production 
PERSISTENCE=mongodb
IS_CLUSTER=true
PORT_MANUAL=8080


MONGO_URI=mongodb+srv://{INSERT USER}:{INSERT PASSWORD}@{INSER CLUSTER & DB}?retryWrites=true&w=majority

EXPIRATION_SESSION=180000
SECRET_SESSION=Soy un gran secreto

GMAIL_USER= Ingrese mail donde llegarán notificaciones
GMAIL_USER_PASS= Ingrese contraseña del mail donde llegarán notificaciones

TWILIO_ACCOUNT_SID= Ingrese SID de Twilio
TWILIO_AUTH_TOKEN= Ingrese TOKEN de Twilio
TWILIO_NUMBER= Ingrese número otorgado por Twilio
TWILIO_NUMBER_WHATSAPP= Ingrese número de Whatsapp otorgado por Twilio

FACEBOOK_CLIENT_ID= Ingrese FB ID
FACEBOOK_CLIENT_SECRET= Ingrese TOKEN de FB ID

```


¡Perfecto! 😁 Ahora simplemente deberás ejecutar el proyecto.


## ¿Cómo inicar el servidor?

Modo producción ➡️ es necesario archivo production.env
```
npm run prod
```

Modo desarrollo ➡️ es necesario archivo development.env
```
npm run dev
```

### Especificacion de CLI para iniciar el proyecto
Utilizamos el modulo **Yargs** en caso de querer cofigurar ciertos parámetros por consola:

* --portCLI= Numero de puerto, por ejemplo 3000

* --mongouriCLI= URL de Mongo, por ejemplo mongodb+srv://{USUARIO}:{CONTRASEÑA}@cluster1.gplx5.mongodb.net/{BASE DE DATOS}?retryWrites=true&w=majority

* --notifyMailCLI= mail donde se van a enviar las notificaciones de correo electrónico, por ejemplo: marko.bertonati@gmail.com

* --passMailCLI= contraseña del correo electrónico

* --expirationSessionCLI= duración de la expresión expresado en milisegundos

* --persistenceCLI= deberá ser "mongodb" o "memory"

**ATENCIÖN** ➡️ es completamente necesario luego de ingresar por consola **npm run prod --** los doble flat finales (--) y luego, mediante doble flat y alguno de los parámetros de arriba colocar el valor

Ejemplo de CLI bien armado: 
```
npm run prod -- --portCLI=8060 --expirationSessionCLI=600000
```


## Arquitectura de carpetas 🦴

El proyecto está construido bajo el patrón MVC agrupado bajo distintas carpetas:

📁 __ test __: contiene los mockup con los que funciona la app en modo develompemnt

📁 public: contiene los archivos estáticos que brinda la app

📁 src: contiene la aplicación en si misma
* 📁 auth: contiene los controladores de autenticación
    * 📁 bcrypt: contiene configuración
* 📁 config: configuraciones globales
* 📁 controller: contiene los controladores que responden a las rutas
* 📁 dal: contiene los diferentes accesos a la información de la persistencia
    * 📁 memory
    * 📁 mongoose
* 📁 graphql: contiene la configuración de graphql
* 📁 logger: contiene la configuración del módulo log4js
* 📁 mailing: contiene la configuración de nodemailer
* 📁 routes: contiene la configuración de todas las rutas
* 📁 services: contiene la lógica de negocio
* 📁 sms: contiene la configuración de twilio
* 📁 utils: contiene diversos archivos que sirve a diferentes controladores


📁 views: contiene las diferentes vistas construidas a partir de handlesbars

📝 index.js: el proyecto es ejecutado a partir del archivo

📝 server.js: contiene la configuración del servidor
        

## Rutas (endpoints) 🛣️

#### routesAuth
.post(/api/signup) ➡️ se envian mediante req.body la información necesaria para poder registrar un usuario

```
name: req.body.name,
lastname: req.body.lastname,
age: req.body.age,
number: req.body.number,
address: req.body.address,
email: req.body.email,
avatar: `/static/avatar/${req.file.filename}`,
password: createHash(req.body.password),
```
.get(/failsignup) ➡️ en caso de error en el registro se redireccionada a .get(/error-sigunp) el cual renderiza vista de signup indicado que hubo un error.
Si el usuario es creado correctamente se redirige a .get(/login) que renderiza la vista de login en handlebars.


.post(/api/login) ➡️ se envia mediante req.body la información necesaria para poder iniciar sesión.
```
req.body.email
req.body.password
```
.get(/failogin) ➡️ en caso de error en el login se redirecciona a .get(/error-login) que renderiza la vista de login indicando que hubo un error.
Si el usuario se logea correctamente se redirige a .get(/productos/vista) que renderiza una vista con una tabla con todos los productos


.post(/api/logout) ➡️ deslogea y destruye la sesion creada y redirecciona a .get(/goodbye) que renderiza la vista de que ha terminado su sesión.


Hay además 2 rutas (/auth/facebok y /auth/facebook/callback) en caso de utilizar passport-facebook. La misma no se encuentra implementada como servicio al cliente.


#### routesCart 🛒
.post(/api/cart/post-session) ➡️ recibe por req.body un Array de objetos que contiene { id: id del producto, quantity: número con la cantidad agregada }. Si la sesion no tiene la propiedad cartSession la crea y agrega los productos encontrados. Si existe una cartSession busca si existen mismo productos en el cart para cambiarle la cantidad, y si no existen los agrega. Luego redirige a: 👇

.get(/api/cart/get-session) ➡️ que captura el cartSession de nuestra sesion y renderiza la vista del carrito.


#### routesMessagesChat 💬
🚨 ATENCIÓN: si bien las rutas existen, el servicio de chat se maneja a través de la tecnología websocket, no a través de pedidos http.
.get(/api/message/list) ➡️ renderiza una vista del chat.
.post(/api/message/create) ➡️ recibe del req.body:
```
{ author: 
        {firstName: nombre del usuario, lastName: apellido del usuario, age: edad del usuario, alias: alias del usuario, avatar: link url de imagen, date: fecha de creación del mensaje }
 text: texto del chat
}
```
Devuelve un JSON informando que el mensaje de chat se creo satisfactoriamente.


#### routesOrder 📋




## Autores [@marco.bertonati](https://www.linkedin.com/in/marcobertonati/) ✒️
_Proyecto del curso de [Programación Backend por Coderhouse](https://www.coderhouse.com/online/programacion-backend)_
comisión-13440-pb-online
* **Sebastián Vallejo Rojas** - *Profesor del curso de Programación Backend* 👨🏻‍🏫
* **Juan Collado** - *Tutor de clase* 👨‍💻
