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

Para la autenticación y la autorización utilizamos el modulo de **passport-local**, combinado la encriptación de las contraseñas con **bcrypt**.

Las notificaciones al correo electrónico las manejamos con **nodemailer** y las correspondientes a SMS y Whatsapp con **twilio**.

El chat está implementado en base a la tecnología **Websocket (socket.io)**.



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

**ATENCIÖN** ➡️ es completamente necesario luego de ingresar por consola **npm run prod --** los doble flat finales (--) y luego, mediante doble flat y alguno de los parámetros de arriba cololar el valor

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
            📁 bcrypt: contiene configuración
    * 📁 config: configuraciones globales
    * 📁 controller: contiene los controladores que responden a las rutas
    * 📁 dal: contiene los diferentes accesos a la información de la persistencia
            📁 memory
            📁 mongoose
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
        


## Autores [@marco.bertonati](https://www.linkedin.com/in/marcobertonati/) ✒️
_Proyecto del curso de [ReactJS por Coderhouse](https://www.coderhouse.com/online/reactjs)_
comisión-13440-pb-online
* **Sebastián Vallejo Rijas** - *Profesor del curso de Programación Backend* 👨🏻‍🏫
* **Juan Collado** - *Tutor de clase* 👨‍💻