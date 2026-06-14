const db = require('../config/db');

const Usuario = {

    // Busca un usuario por su correo
    buscarPorCorreo: (correo, callback) => {
        const sql = 'SELECT * FROM usuarios WHERE correo = ?';
        db.query(sql, [correo], callback);
    },

    // Crea un nuevo usuario (la contraseña ya debe venir hasheada)
    crear: (correo, contrasenaHash, callback) => {
        const sql = 'INSERT INTO usuarios (correo, contrasena) VALUES (?, ?)';
        db.query(sql, [correo, contrasenaHash], callback);
    },

    // Busca un usuario por su id (sin devolver la contraseña)
    buscarPorId: (id, callback) => {
        const sql = 'SELECT id, correo FROM usuarios WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Usuario;