const autenticacionRouter = require('express').Router();
const {
    autenticar,
    verificarToken,
} = require('./../controllers/AutenticacionController.js');

autenticacionRouter.post('/autenticar', autenticar);

autenticacionRouter.post('/verificarToken', verificarToken);


exports = autenticacionRouter;
