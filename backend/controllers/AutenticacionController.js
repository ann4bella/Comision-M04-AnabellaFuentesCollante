// Importamos la librería 'jsonwebtoken'.
const jwt = require('jsonwebtoken');

// Importamos el modelo de Usuario.
const UsuarioModel = require('./../models/mongoose/UsuarioModel.js');

// Creamos el controlador de autenticación como un objeto vacío.
const AutenticacionController = {}

// Obtenemos la clave secreta JWT desde las variables de entorno.
const JWT_KEY = process.env.JWT_KEY;

// Función para autenticar a un usuario.
AutenticacionController.autenticar = async (req, res) => {
    try {
        // Extraemos el usuario y contraseña de la solicitud.
        const { usuario, contrasenia } = req.body;

        // Buscamos al usuario en la base de datos.
        const usuarioEncontrado = await UsuarioModel.findOne({
            usuario: usuario,
            contrasenia: contrasenia,
        });

        // Verificamos si el usuario fue encontrado.
        if (!usuarioEncontrado) {
            return res.status(404).json({ mensaje: 'El usuario no fue encontrado.' });
        }

        // Preparamos los datos del token con información del usuario.
        const datosToken = {
            id: usuarioEncontrado._id,
            usuario: usuarioEncontrado.usuario,
            nombres: usuarioEncontrado.nombres,
            apellidos: usuarioEncontrado.apellidos,
        }

        // Creamos un token JWT con los datos del usuario y la clave secreta, con una duración de 1 hora.
        let token = jwt.sign(datosToken, JWT_KEY, { expiresIn: '1h' });

        // Respondemos con el token y los datos del usuario en formato JSON.
        res.json({ token: token, datos: datosToken });
    } catch (error) {
        // En caso de error, respondemos con un estado 500 y un mensaje indicando el problema.
        return res.status(500).json({ mensaje: 'Se produjo un error interno.' });
    }
}

// Función para registrar un nuevo usuario.
AutenticacionController.registrar = async (req, res) => {
    try {
        // Obtenemos los datos del nuevo usuario desde req.body.
        const { usuario, contrasenia, nombres, apellidos } = req.body;

        // Verificamos si el usuario ya existe en la base de datos.
        const usuarioExistente = await UsuarioModel.findOne({ usuario: usuario });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El usuario ya existe.' });
        }

        // Creamos un nuevo usuario con los datos proporcionados.
        const nuevoUsuario = new UsuarioModel({
            usuario: usuario,
            contrasenia: contrasenia,
            nombres: nombres,
            apellidos: apellidos,
        });

        // Guardamos el nuevo usuario en la base de datos.
        const usuarioGuardado = await nuevoUsuario.save();

        // Preparamos los datos del usuario para el token.
        const datosToken = {
            id: usuarioGuardado._id,
            usuario: usuarioGuardado.usuario,
            nombres: usuarioGuardado.nombres,
            apellidos: usuarioGuardado.apellidos,
        };

        // Generamos un token para el nuevo usuario.
        const token = jwt.sign(datosToken, JWT_KEY, { expiresIn: '1h' });

        // Respondemos con el token y los datos del usuario en formato JSON.
        res.json({ token: token, datos: datosToken });
    } catch (error) {
        // En caso de error, respondemos con un estado 500 y un mensaje indicando el problema.
        console.error('Error al registrar nuevo usuario:', error);
        return res.status(500).json({ mensaje: 'Se produjo un error al registrar el nuevo usuario.' });
    }
}

// Función para verificar un token.
AutenticacionController.verificarToken = (req, res) => {
    // Extraemos el token de la solicitud.
    const token = req.body.token;

    try {
        // Desencriptamos el token utilizando la clave secreta.
        let desencriptado = jwt.verify(token, JWT_KEY);

        // Respondemos con los datos desencriptados en formato JSON.
        res.json({ datos: desencriptado });
    } catch (error) {
        // En caso de error, respondemos con un estado 500 y un mensaje indicando el problema.
        res.status(500).json({
            mensaje: 'Se ha generado un error al verificar el token',
            error: error,
        });
    }
}

// Exportamos el controlador de autenticación.
module.exports = AutenticacionController;
