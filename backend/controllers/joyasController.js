import joyasModel from '../models/joyas.js';

const joyasController = {
    async getJoyas(req, res) {
        try {
            const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
            
            const resultado = await joyasModel.getJoyas(
                parseInt(limits),
                parseInt(page),
                order_by
            );
            
            const HATEOAS = {
                joyas: resultado.joyas.map(joya => ({
                    ...joya,
                    links: [
                        { rel: 'self', href: `/joyas/${joya.id}` },
                        { rel: 'filtros', href: `/joyas/filtros?precio_max=${joya.precio + 1000}&precio_min=${joya.precio - 1000}` }
                    ]
                })),
                total: resultado.total,
                pagina: resultado.pagina,
                limite: resultado.limite
            };
            
            res.json(HATEOAS);
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