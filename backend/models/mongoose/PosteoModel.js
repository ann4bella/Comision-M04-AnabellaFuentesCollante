// importamos las funcionalidades Schema y model desde la librería 'mongoose'.
const { Schema, model } = require('mongoose');

// creamos un nuevo esquema para los posteos.
const PosteoSchema = new Schema({
    titulo: String,
    descripcion: String,
    imagenURL: String,
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
});

// creamos el modelo 'Posteo' utilizando el esquema definido.
const PosteoModel = model('posteo', PosteoSchema);

// exportamos el modelo para su uso en otras partes de la aplicación.
module.exports = PosteoModel;
