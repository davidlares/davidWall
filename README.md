## DavidWall

 DavidWall es un desarrollo experimental para estudiar el uso de los servicios de Facebook bajo la autenticación (protocolo Oauth) para escribir en tu cuenta de facebook (muro) y listar los amigos en común que estén usando la aplicación web.


 Desarrollado con ExpressJS y Passport JS (Estrategia de Oath de Facebook)

## Uso

 - Primeramente deberás tener una aplicación creada en la plaforma de developers de FB y configurar el producto Facebook Login con sus respectivos rutas Callbacks.
 - Seguidamente crear usuarios falsos dentro de las posibilidades que entrega facebook para testing
 - Crea un archivo `.env` en el directorio raiz del desarrollo y añade los valores: `FB_CLIENT_ID`, `FB_CLIENT_SECRET` y `FB_CALLBACK_URL`
 - Primero se deben instalar las dependencias del proyecto `npm install`
 - Debido al uso de un paquete de nombre `dotenv`, no es posible usar nodemon correctamente (en su lugar) usa `npm start`

## Dependencias

 - PHP Slim Framework
 - Guzzle HTTP Client
 - PHPDotEnv
 - Facebook Application + Facebook Page + Facebook Webhook

##  Despliegue Local

  - el comando `npm start` levantará un servidor en NodeJS. Seguidamente durante el registro de los callbacks es factible el uso de direcciones locales bajo HTTPS.

  - Para efectos de pruebas bajo entornos locales https se tiene una alternativa ngrok para hacer un mirroring
    de un servidor local (en este caso LAMP), a una direccion https valida para la validación del Webhook

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
