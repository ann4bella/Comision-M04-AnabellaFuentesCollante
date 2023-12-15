const { DataTypes } = require('sequelize');

const { sequelize } = require('./../config/SequelizeConfig.js');

const UsuarioModel = sequelize.define('Usuario', {
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagenURL: String,
});

module.exports = UsuarioModel;
