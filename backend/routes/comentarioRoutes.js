// definimos un enrutador para manejar las rutas relacionadas con los comentarios
const comentarioRouter = require('express').Router();

// importamos las funciones del controlador necesarias para manejar los comentarios
const {
    listarComentariosDePosteo,
    crearComentario,
    eliminarComentario,
    editarComentario,
} = require('../controllers/mongoose/ComentarioController');

// definimos la ruta para obtener la lista de comentarios de un posteo específico
comentarioRouter.get('/comentarios/:idPosteo', listarComentariosDePosteo);

// definimos la ruta para crear un nuevo comentario
comentarioRouter.post('/comentarios', crearComentario);

// definimos la ruta para eliminar un comentario existente
comentarioRouter.delete('/comentarios/:id', eliminarComentario);

// definimos la ruta para editar un comentario existente
comentarioRouter.put('/comentarios/:id', editarComentario);

// exportamos el enrutador para su uso en otras partes de la aplicación
module.exports = comentarioRouter;
