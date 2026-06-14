const db = require('../config/db');

const Tarea = {

    // Muestra todas las tareas de un usuario
    mostrarTodas: (idUsuario, callback) => {
        const sql = 'SELECT * FROM tareas WHERE id_usuario = ? ORDER BY id DESC';
        db.query(sql, [idUsuario], callback);
    },

    // Crea una nueva tarea para un usuario
    crear: (titulo, idUsuario, callback) => {
        const sql = 'INSERT INTO tareas (titulo, id_usuario) VALUES (?, ?)';
        db.query(sql, [titulo, idUsuario], callback);
    },

    // Elimina una tarea por su id (solo si pertenece al usuario)
    eliminar: (id, idUsuario, callback) => {
        const sql = 'DELETE FROM tareas WHERE id = ? AND id_usuario = ?';
        db.query(sql, [id, idUsuario], callback);
    },

    // Marca/desmarca una tarea como completada (solo si pertenece al usuario)
    marcarComoCompletada: (id, idUsuario, callback) => {
        const sql = 'UPDATE tareas SET completada = NOT completada WHERE id = ? AND id_usuario = ?';
        db.query(sql, [id, idUsuario], callback);
    }
};

module.exports = Tarea;