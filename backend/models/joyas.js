import pool from '../config/database.js';

const joyasModel = {
    async getJoyas(limits, page, order_by) {
        try {
            // Validar y configurar parámetros
            const validLimits = limits > 0 ? limits : 10;
            const validPage = page > 0 ? page : 1;
            const offset = (validPage - 1) * validLimits;
            
            // Validar el formato del parámetro order_by
            let campo = 'id';
            let direccion = 'ASC';
            
            if (order_by && order_by.includes('_')) {
                const parts = order_by.split('_');
                // Validar que el campo y la dirección sean válidos
                if (parts.length === 2) {
                    const posibleCampo = parts[0];
                    const posibleDireccion = parts[1];
                    
                    // Lista de campos válidos
                    const camposValidos = ['id', 'nombre', 'precio', 'stock', 'categoria', 'metal'];
                    // Lista de direcciones válidas
                    const direccionesValidas = ['ASC', 'DESC', 'asc', 'desc'];
                    
                    if (camposValidos.includes(posibleCampo) && 
                        direccionesValidas.includes(posibleDireccion.toUpperCase())) {
                        campo = posibleCampo;
                        direccion = posibleDireccion.toUpperCase();
                    }
                }
            }
            
            // Consulta para obtener las joyas con paginación y ordenamiento
            const queryJoyas = `
                SELECT id, nombre, categoria, metal, precio, stock
                FROM inventario 
                ORDER BY ${campo} ${direccion}
                LIMIT $1 OFFSET $2
            `;
            
            const { rows: joyas } = await pool.query(queryJoyas, [validLimits, offset]);
            
            // Calcular el totalJoyas como la cantidad de joyas en la página actual
            const totalJoyas = joyas.length;
            
            // Calcular stockTotal sumando solo el stock de las joyas devueltas
            let stockTotal = 0;
            joyas.forEach(joya => {
                stockTotal += joya.stock;
            });
            
            return {
                joyas,
                totalJoyas,
                stockTotal
            };
        } catch (error) {
            throw error;
        }
    },

    async getJoyasFiltradas(precio_max, precio_min, categoria, metal) {
        try {
            // Iniciar con una consulta base
            let query = 'SELECT id, nombre, categoria, metal, precio, stock FROM inventario WHERE 1=1';
            const values = [];
            let paramCount = 1;

            // Agregar condiciones según los parámetros proporcionados
            if (precio_max) {
                query += ` AND precio <= $${paramCount}`;
                values.push(precio_max);
                paramCount++;
            }

            if (precio_min) {
                query += ` AND precio >= $${paramCount}`;
                values.push(precio_min);
                paramCount++;
            }

            if (categoria) {
                query += ` AND categoria = $${paramCount}`;
                values.push(categoria);
                paramCount++;
            }

            if (metal) {
                query += ` AND metal = $${paramCount}`;
                values.push(metal);
                paramCount++;
            }

            // Ejecutar la consulta con los parámetros seguros
            const { rows } = await pool.query(query, values);
            return rows;
        } catch (error) {
            throw error;
        }
    }
};

export default joyasModel; 