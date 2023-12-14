// Cargamos las variables de entorno desde el archivo .env.
require('dotenv').config();

// Importamos las librerías necesarias para construir el servidor.
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

// Importamos la función para conectar con la base de datos MongoDB.
const conectarMongo = require('./config/MongooseConfig.js');

// Importamos los enrutadores para diferentes funcionalidades.
const usuarioRouter = require('./routes/usuarioRoutes.js');
const autenticacionRouter = require('./routes/autenticacionRoutes.js');
const posteoRouter = require('./routes/posteoRoutes.js');
const comentarioRouter = require('./routes/comentarioRoutes.js');

// Creamos una instancia de la aplicación Express.
const app = express();

// Obtenemos el número de puerto desde las variables de entorno.
const PORT = process.env.PORT;

// Middleware
// Utilizamos middleware para habilitar CORS, parsear el cuerpo de las solicitudes en formato JSON y habilitar el manejo de archivos.
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor!');
});


// Rutas
// Configuramos las rutas para diferentes funcionalidades.
app.use(usuarioRouter);
app.use(autenticacionRouter);
app.use(posteoRouter);
app.use(comentarioRouter);


// Iniciamos el servidor en el puerto especificado y conectamos con la base de datos.
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    conectarMongo();
});