## DavidWall

 DavidWall es un desarrollo experimental para estudiar el uso de los servicios de Facebook bajo la autenticación (protocolo Oauth) cuyo propósito es escribir en el muro de tu cuenta de Facebook y listar los amigos en común que estén usando la aplicación web.

 Desarrollado con ExpressJS y Passport JS (Estrategia de Oath de Facebook).

## Uso

 - Primeramente deberás tener una aplicación creada en la plaforma de developers de FB y configurar el producto Facebook Login con sus respectivos rutas Callbacks, tener Node.js y MongoDB instalados.
 - Seguidamente crear usuarios falsos dentro de las posibilidades que entrega facebook para testing.
 - Crea un archivo `.env` en el directorio raiz del desarrollo y añade los valores: `FB_CLIENT_ID`, `FB_CLIENT_SECRET` y `FB_CALLBACK_URL`.
 - Primero se deben instalar las dependencias del proyecto `npm install`.
 - Debido al uso de un paquete de nombre `dotenv`, no es posible usar nodemon correctamente (en su lugar) usa `npm start`.

## Dependencias

  - body-parser -> Manejador de las variables del cuerpo HTTP para peticiones vía POST.
  - cookie-session -> Creación de sesiones y cookies para ExpressJS.
  - dotenv -> Librería para el manejo de variables de entorno.
  - express -> Framework web minimalista de NodeJs.
  - fbgraph -> Librería que permite acceso a API Graph de Facebook.
  - mongoose -> ORM de bases de datos no relacionales.
  - mongoose-findorcreate -> extensión de las funcionalidades de Mongoose para buscar de manera fácil si existe un registro o no.
  - passport -> middleware de autenticación para NodeJS.
  - passport-facebook -> estrategía de autenticación de passport para servicios de Facebook.
  - pug -> motor de vista HTML.

##  Despliegue Local

  - el comando `npm start` levantará un servidor en NodeJS. Seguidamente durante el registro de los callbacks es factible el uso de direcciones locales bajo HTTPS.

  - Para efectos de pruebas bajo entornos locales https se tiene una alternativa ngrok para hacer un mirroring
    de un servidor local (en este caso LAMP), a una direccion https valida para la validación del Webhook.

  - [ngRok](https://ngrok.com) - /.ngrok http 8000

## Permisos de Facebook

  - publish_to_group
  - manage_pages
  - publish_pages
  - status_update
  - user_friends

## Créditos
- [David E Lares S](https://twitter.com/@davidlares3)

## Licencia

[MIT](https://opensource.org/licenses/MIT)
