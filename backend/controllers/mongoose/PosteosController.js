const PosteoModel = require('./../../models/mongoose/PosteoModel.js');

const { verificarToken } = require('./../../utils/token.js');

const PosteosController = {}

// VER TODAS
// Ver publicaciones
PosteosController.verPosteos = async (req, res) => {
    try {
        const listaPosteos = await PosteoModel.find().populate('autor');
        
        return res.json(listaPosteos);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno',
            error: error
        });
    }
}
//VER 1
// Ver publicación
PosteosController.verPosteo = async (req, res) => {
    try {
        const { id } = req.params;

        const posteoEncontrado = await PosteoModel.findById(id);
        
        return res.json(posteoEncontrado);
    } catch (error) {
        let mensaje = 'Ocurrió un error interno al intentar obtener la publicación';

        if (error.kind === 'ObjectId') {
            mensaje = 'No se pudo obtener la publicación';
        }

        return res.status(500).json({
            mensaje: mensaje,
            error: error
        });
    }
}
//CREAR 1
// Crear publicación
PosteosController.crearPosteo = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;

        const { token } = req.headers;

        const tokenValido = verificarToken(token);

        if (!tokenValido) {
            return res.status(500).json({
                mensaje: 'El token no es válido',
                error: error
            });
        }

        const autor = tokenValido.id;

        const nuevoPosteo = new PosteoModel({
            titulo: titulo,
            descripcion: descripcion,
            autor: autor,
        });

        await nuevoPosteo.save();

        return res.json({ mensaje: 'Publicación creada con éxito' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar crear la publicación',
            error: error
        });
    }
}

// EDITAR 1
// definimos la función de controlador para editar un posteo
PosteosController.editarPosteo = async (req, res) => {
    try {
        // extraemos los datos necesarios de la solicitud HTTP
        const { id, titulo, descripcion } = req.body;
        const { token } = req.headers;

        // validamos el token
        const tokenValido = verificarToken(token);

        // si el token no es válido, respondemos con un error
        if (!tokenValido) {
            return res.status(500).json({
                mensaje: 'El token no es válido'
            });
        }

        // obtenemos el ID del usuario autenticado
        const userId = tokenValido.id;

        // buscamos el posteo por su ID
        const posteo = await PosteoModel.findById(id);

        // verificamos si el autor del posteo es el mismo que el usuario autenticado
        if (posteo.autor.toString() !== userId) {
            return res.status(500).json({
                mensaje: 'El autor no es el mismo'
            });
        }

        // actualizamos el posteo utilizando el método findByIdAndUpdate
        await PosteoModel.findByIdAndUpdate(
            id,
            { titulo: titulo, descripcion: descripcion }
        );

        // respondemos con un mensaje de éxito
        return res.json({ mensaje: 'Publicación actualizada con éxito' });
    } catch (error) {
        // en caso de un error interno, respondemos con un mensaje de error
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar editar la publicación',
            error: error
        });
    }
}

// ELIMINAR 1
// esta función en el controlador de Posteos se encarga de eliminar una publicación.

PosteosController.eliminarPosteo = async (req, res) => {
    try {
        // extraemos el ID de la solicitud.
        const { id } = req.body;

        // utilizamos el modelo Posteo para buscar y eliminar la publicación por su ID.
        await PosteoModel.findByIdAndDelete(id);

        // respondemos con un mensaje JSON indicando que la publicación se eliminó con éxito.
        return res.json({ mensaje: 'Publicación eliminada con éxito' });
    } catch (error) {
        // en caso de error, respondemos con un estado 500 y un mensaje indicando el problema.
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar eliminar la publicación',
            error: error
        });
    }
}


module.exports = PosteosController;
