const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Sirve los archivos del frontend (carpeta "frontend" al lado de "backend")
app.use(express.static(path.join(__dirname, '../frontend')));

const authRoutes = require('./routes/AuthRoute');
const TareasRoutes = require('./routes/TareaRoute');

app.use('/api/auth', authRoutes);
app.use('/api/tareas', TareasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});