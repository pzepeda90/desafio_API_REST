import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reportesMiddleware = (req, res, next) => {
    // Capturar tiempo de inicio
    const startTime = new Date();
    
    // Almacenar el método original de res.json
    const originalJson = res.json;
    
    // Sobreescribir el método res.json para capturar la respuesta
    res.json = function(data) {
        // Calcular tiempo de respuesta
        const endTime = new Date();
        const responseTime = endTime - startTime;
        
        // Obtener información de la petición
        const timestamp = startTime.toISOString();
        const ruta = req.path;
        const metodo = req.method;
        const ip = req.ip || req.connection.remoteAddress;
        const userAgent = req.headers['user-agent'] || 'Desconocido';
        const queryParams = JSON.stringify(req.query);
        const statusCode = res.statusCode;
        
        // Formatear el mensaje de log
        const logEntry = `[${timestamp}] IP: ${ip} | Ruta: ${ruta} | Método: ${metodo} | Estado: ${statusCode} | Tiempo: ${responseTime}ms | User-Agent: ${userAgent} | Parámetros: ${queryParams}\n`;
        
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
        
        // Continuar con el comportamiento original
        return originalJson.call(this, data);
    };
    
    next();
};

export default reportesMiddleware; 