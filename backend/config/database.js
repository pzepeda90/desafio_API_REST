import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    allowExitOnIdle: true
});

// Verificar la conexión a la base de datos
pool.query("SELECT NOW()")
    .then(() => console.log("Database connected successfully"))
    .catch(error => console.log("Error connecting to database:", error));

export default pool; 