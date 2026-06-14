const Tarea = require('../models/Tarea');

// Muestra todas las tareas del usuario logueado
exports.show = (req, res) => {

    const idUsuario = req.usuario.id;

    Tarea.mostrarTodas(idUsuario, (error, results) => {

        if (error) {
            return res.status(500).json({
                message: 'Error del servidor'
            });
        }

        res.status(200).json(results);
    });
};

// Crea una nueva tarea para el usuario logueado
exports.save = (req, res) => {

    const { titulo } = req.body;
    const idUsuario = req.usuario.id;

    if (!titulo) {
        return res.status(400).json({
            message: 'Debe capturar un titulo'
        });
    }

    Tarea.crear(titulo, idUsuario, (error, result) => {

        if (error) {
            return res.status(500).json({
                message: 'No se pudo crear la tarea'
            });
        }

        res.status(201).json({
            message: 'Tarea creada correctamente',
            id: result.insertId
        });
    });
};

// Elimina una tarea del usuario logueado
exports.delete = (req, res) => {

    const { id } = req.body;
    const idUsuario = req.usuario.id;

    if (!id) {
        return res.status(400).json({
            message: 'Debe capturar un id'
        });
    }

    Tarea.eliminar(id, idUsuario, (error, result) => {

        if (error) {
            return res.status(500).json({
                message: 'Error del servidor'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'La tarea no existe'
            });
        }

        res.status(200).json({
            message: 'Tarea eliminada correctamente'
        });
    });
};

// Marca/desmarca una tarea del usuario logueado como completada
exports.check = (req, res) => {

    const { id } = req.body;
    const idUsuario = req.usuario.id;

    if (!id) {
        return res.status(400).json({
            message: 'Debe capturar un id'
        });
    }

    Tarea.marcarComoCompletada(id, idUsuario, (error, result) => {

        if (error) {
            return res.status(500).json({
                message: 'Error del servidor'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'La tarea no existe'
            });
        }

        res.status(200).json({
            message: 'Tarea actualizada correctamente'
        });
    });
};