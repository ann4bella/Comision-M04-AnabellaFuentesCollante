const ComentarioModel = require('./../../models/mongoose/ComentarioModel.js');

const { verificarToken } = require('./../../utils/token.js');

const ComentariosController = {}

// VER TODOS LOS COMENTARIOS
ComentariosController.listarComentariosDePosteo = async (req, res) => {
    try {
        const { idPosteo } = req.params;

        const comentariosEncontrados = await ComentarioModel.find({
            posteo: idPosteo
        }).populate('autor');
        
        return res.json(comentariosEncontrados);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'No pudo obtener los comentarios de la publicación.',
            error: error
        });
    }
}

//CREAR 1 COMENTARIO
ComentariosController.crearComentario = async (req, res) => {
    try {
        const { descripcion, idPosteo } = req.body;
        const { token } = req.headers;

        const tokenValido = verificarToken(token);

        if (!tokenValido) {
            return res.status(500).json({
                mensaje: 'El token no es válido',
            });
        }

        const autor = tokenValido.id;

        const nuevoComentario = new ComentarioModel({
            descripcion: descripcion,
            autor: autor,
            posteo: idPosteo,
        });

        await nuevoComentario.save();

        return res.json({ mensaje: 'Comentario creado con éxito' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar crear el comentario',
            error: error
        });
    }
}

//AGREGO ESTE CODIGO PARA ELIMINAR Y EDITAR COMENTARIOS
//ELIMINAR 1 COMENTARIO
ComentariosController.eliminarComentario = async (req, res) => {
    try {
        const { id } = req.body;

        await ComentarioModel.findByIdAndDelete(id);

        return res.json({ mensaje: 'Comentario eliminado con éxito' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar eliminar el comentario',
            error: error
        });
    }
}

//EDITAR 1 COMENTARIO
ComentariosController.editarComentario = async (req, res) => {
    try {
        const { id, descripcion } = req.body;

        await ComentarioModel.findByIdAndUpdate(id, { descripcion: descripcion });

        return res.json({ mensaje: 'Comentario editado con éxito' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar editar el comentario',
            error: error
        });
    }
}

module.exports = ComentariosController;

