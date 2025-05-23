import pool from '../config/database.js';

const inventarioModel = {
    async getInventario(limits, page, order_by) {
        try {
            const offset = (page - 1) * limits;
            const [campo, direccion] = order_by.split('_');
            
            const query = `
                SELECT * FROM inventario 
                ORDER BY ${campo} ${direccion}
                LIMIT $1 OFFSET $2
            `;
            
            const { rows } = await pool.query(query, [limits, offset]);
            
            const total = await pool.query('SELECT COUNT(*) FROM inventario');
            const totalItems = parseInt(total.rows[0].count);
            
            return {
                inventario: rows,
                total: totalItems,
                pagina: page,
                limite: limits
            };
        } catch (error) {
            throw error;
        }
    },

    async getInventarioFiltrado(precio_max, precio_min, categoria, metal) {
        try {
            let query = 'SELECT * FROM inventario WHERE 1=1';
            const values = [];
            let paramCount = 1;

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
            }

            const { rows } = await pool.query(query, values);
            return rows;
        } catch (error) {
            throw error;
        }
    }
};

export default inventarioModel; 