import express from 'express';
import cors from 'cors';
import joyasRoutes from './routes/joyasRoutes.js';
import inventarioRoutes from './routes/inventarioRoutes.js';
import dotenv from 'dotenv';
import pool from "./config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Ruta simple de prueba
app.get('/', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});

// Rutas de la API
app.use('/', joyasRoutes);
app.use('/', inventarioRoutes);

// Ruta de prueba para verificar la conexión a la base de datos
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ message: "Conexión exitosa a la base de datos", time: result.rows[0].now });
    } catch (error) {
        res.status(500).json({ error: "Error al conectar con la base de datos", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
