const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({
            message: 'Token requerido'
        });
    }

    // El header viene como "Bearer <token>", se separa por ESPACIO
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({
            message: 'Token inválido'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {

        if (error) {
            return res.status(401).json({
                message: 'Token no autorizado'
            });
        }

        // Guarda los datos del usuario decodificados (id, correo) para usarlos en el controlador
        req.usuario = decoded;
        next();
    });
};

module.exports = verifyToken;