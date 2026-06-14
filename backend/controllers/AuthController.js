// Importa el modelo de usuario
const Usuario = require('../models/Usuario');

// Importa bcrypt y jsonwebtoken
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {

    // Obtiene los datos enviados desde el formulario
    const { correo, contrasena } = req.body;

    // Validacion de campos vacios
    if (!correo || !contrasena) {
        return res.status(400).json({
            message: 'Debe capturar correo y contraseña'
        });
    }

    // Verifica si el usuario ya existe
    Usuario.buscarPorCorreo(correo, async (error, results) => {

        if (error) {
            return res.status(500).json({
                message: 'Error del servidor'
            });
        }

        if (results.length > 0) {
            return res.status(409).json({
                message: 'El usuario ya existe'
            });
        }

        // Genera el hash de la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Inserta el nuevo usuario
        Usuario.crear(correo, hashedPassword, (error, result) => {

            if (error) {
                return res.status(500).json({
                    message: 'No se pudo registrar el usuario'
                });
            }

            res.status(201).json({
                message: 'Usuario registrado correctamente'
            });
        });
    });
};


exports.login = (req, res) => {

    const { correo, contrasena } = req.body;

    // Validacion de campos vacios
    if (!correo || !contrasena) {
        return res.status(400).json({
            message: 'Debe capturar correo y contraseña'
        });
    }

    // Busca el usuario
    Usuario.buscarPorCorreo(correo, async (error, results) => {

        if (error) {
            return res.status(500).json({
                message: 'Error del servidor'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: 'El usuario no existe'
            });
        }

        const usuario = results[0];

        // Compara la contraseña capturada con el hash almacenado
        const coincide = await bcrypt.compare(
            contrasena,
            usuario.contrasena
        );

        if (!coincide) {
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });
        }

        // Genera el token JWT con el id y correo del usuario
        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        // Login exitoso
        res.status(200).json({
            message: `Bienvenido ${usuario.correo}`,
            token: token
        });
    });
};