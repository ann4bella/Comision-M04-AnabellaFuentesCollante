// Importa el router de Express
const autenticacionRouter = require('express').Router();

// Importa los controladores relacionados con la autenticación
const {
  autenticar,
  registrar,
  verificarToken,
} = require('./../controllers/AutenticacionController.js');

// Ruta para autenticar a un usuario (inicio de sesión)
autenticacionRouter.post('/autenticar', autenticar);

// Ruta para registrar a un nuevo usuario
autenticacionRouter.post('/registrar', registrar);

// Ruta para verificar un token de autenticación
autenticacionRouter.post('/verificarToken', verificarToken);

// Exporta el router para que pueda ser utilizado por la aplicación principal
module.exports = autenticacionRouter;