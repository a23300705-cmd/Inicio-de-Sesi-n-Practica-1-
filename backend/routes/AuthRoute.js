// Importa Express
const express = require('express');

// Crea el enrutador
const router = express.Router();

// Importa el controlador (nombre correcto del archivo)
const authController = require('../Controllers/AuthController');

// Ruta para registrar usuarios
router.post(
    '/register',
    authController.register
);

// Ruta para iniciar sesión
router.post(
    '/login',
    authController.login
);

// Exporta el router
module.exports = router;