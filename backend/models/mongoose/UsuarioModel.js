const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    usuario: String,
    contrasenia: String,
    nombres: String,
    apellidos: String,
    imagenURL: String,
});

const UsuarioModel = model('usuario', UsuarioSchema);

module.exports = UsuarioModel;
