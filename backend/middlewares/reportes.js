import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reportesMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const ruta = req.path;
    const metodo = req.method;
    const queryParams = JSON.stringify(req.query);
    
    const logEntry = `[${timestamp}] Ruta: ${ruta} | Método: ${metodo} | Parámetros: ${queryParams}\n`;
    
    // Asegurarse de que el directorio logs existe
    const logDir = path.join(__dirname, '..', 'logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    
    // Escribir en el archivo de logs
    fs.appendFile(path.join(logDir, 'consultas.log'), logEntry, (err) => {
        if (err) {
            console.error('Error al escribir en el log:', err);
        }
    });
    
    next();
};

export default reportesMiddleware; 