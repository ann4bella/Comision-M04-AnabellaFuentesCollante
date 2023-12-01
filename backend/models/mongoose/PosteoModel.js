// importamos las funcionalidades Schema y model desde la librería 'mongoose'.
const { Schema, model } = require('mongoose');

// creamos un nuevo esquema para los posteos.
const PosteoSchema = new Schema({
    // definimos un campo para el título de la publicación como tipo String.
    titulo: String,

    // definimos un campo para la descripción de la publicación como tipo String.
    descripcion: String,

    // definimos un campo para el autor de la publicación, utilizando un tipo ObjectId referenciando al modelo 'usuario'.
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
    },
});

// creamos el modelo 'Posteo' utilizando el esquema definido.
const PosteoModel = model('posteo', PosteoSchema);

// exportamos el modelo para su uso en otras partes de la aplicación.
module.exports = PosteoModel;
