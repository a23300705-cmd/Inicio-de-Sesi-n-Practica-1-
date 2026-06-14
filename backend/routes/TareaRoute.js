// Importa Express
const express = require('express');

// Crea el enrutador
const router = express.Router();

// Importa el controlador y el middleware de autenticacion
const TareaController = require('../controllers/TareaController');
const verifyToken = require('../middleware/Middleware');

// Todas las rutas de tareas requieren estar logueado
router.use(verifyToken);

// Ruta para guardar tareas
router.post(
    '/save',
    TareaController.save
);

// Ruta para eliminar tareas
router.post(
    '/delete',
    TareaController.delete
);

// Ruta para mostrar todas las tareas
router.get(
    '/show',
    TareaController.show
);

// Ruta para marcar tareas como completadas
router.post(
    '/check',
    TareaController.check
);

// Exporta el router
module.exports = router;