
# 👋 Bienvenido a Pinflag challenge

Este proyecto esta basado en [Nodejs Challenge](https://www.google.com) de Pinflag.


## Autor

- [@asiz15](https://github.com/asiz15)


## Documentación
La documentación detallada de este desafío la puedes encontrar en el siguiente [link.](https://alex-silva.gitbook.io/pinflag-challenge/) 



## Variables de entorno por defecto
`DATABASE_URI=postgres://pinflag:GzE9KLaEk@127.0.0.1:5432/pinflag_challenge`

`DATABASE_USERNAME=pinflag`

`DATABASE_PASSWORD=GzE9KLaEk`

`DATABASE_NAME=pinflag_challenge`

`DATABASE_HOST=127.0.0.1`

`DATABASE_PORT=5432`

## Credenciales por defecto PgAdmin
  - admin@pgadmin.com
  - JcL2X6gBg



## Instalación
*Debes tener instalado Docker y Docker-compose*


1.Clona el repositorio e instala las dependencias del proyecto

```bash
  npm install
```

2.Crea un archivo .env en la raíz del proyecto y guarda en el las variables de 
entorno por defecto descritas anteriormente.

3.Inicializa la base de datos:

  *Tendras disponible en el puerto 80 de tu localhost PgAdmin.*  
```bash
  docker-compose up
```

4.Ejecuta las migraciones pendientes:
```bash
  npx sequelize-cli db:migrate
```

5.Inicia la app en modo desarrollo:
```bash
  npm run dev
```
    
## Importante

Si estas usando windows, deberás cambiar los scripts del archivo package.json por los
siguientes:

```javascript
"scripts": {
    "lint": "eslint --fix src",
    "build": "babel src --ignore src/tests --out-dir build --copy-files --no-copy-ignored --source-maps inline",
    "start": "npm run lint && npm run build && node ./build/index.js",
    "dev": "nodemon --watch src --exec npm run start",
    "test": "set NODE_OPTIONS=--experimental-vm-modules && jest --verbose --silent",
    "test:watch": "npm run test -- --watch",
    "test:helpers": "set NODE_OPTIONS=--experimental-vm-modules && jest --verbose --silent -- -t helpers.test",
    "test:rest": "set NODE_OPTIONS=--experimental-vm-modules && jest --verbose --silent -- -t endpoints.test",
    "test:graphql": "set NODE_OPTIONS=--experimental-vm-modules && jest --verbose --silent -- -t graphql.test"
  },
```



## Tests

- Para correr todos los tests
```bash
  npm run test
```
- Para correr todos los tests y observar por cambios.
```bash
  npm run test:watch
```
- Para correr solo los test asociados a la REST API.
```bash
  npm run test:rest
```
- Para correr solo los test asociados a la API de GraphQL.
```bash
  npm run test:graphql
```
- Para correr solo los test asociados a los helpers.
```bash
  npm run test:helpers
```
