import joyasModel from '../models/joyas.js';

const joyasController = {
    async getJoyas(req, res) {
        try {
            const { limits = 3, page = 1, order_by = 'id_ASC' } = req.query;
            
            const resultado = await joyasModel.getJoyas(
                parseInt(limits),
                parseInt(page),
                order_by
            );
            
            // Formateamos la respuesta según el formato esperado
            const respuesta = {
                totalJoyas: resultado.totalJoyas,
                stockTotal: resultado.stockTotal,
                results: resultado.joyas.map(joya => ({
                    name: joya.nombre,
                    href: `/joyas/joya/${joya.id}`
                }))
            };
            
            res.json(respuesta);
        } catch (error) {
            console.error('Error en getJoyas:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    async getJoyasFiltradas(req, res) {
        try {
            const { precio_max, precio_min, categoria, metal } = req.query;
            
            const joyas = await joyasModel.getJoyasFiltradas(
                precio_max,
                precio_min,
                categoria,
                metal
            );
            
            res.json(joyas);
        } catch (error) {
            console.error('Error en getJoyasFiltradas:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

export default joyasController; 