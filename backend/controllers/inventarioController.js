import inventarioModel from '../models/inventario.js';

const inventarioController = {
    async getInventario(req, res) {
        try {
            const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
            
            const resultado = await inventarioModel.getInventario(
                parseInt(limits),
                parseInt(page),
                order_by
            );
            
            const HATEOAS = {
                inventario: resultado.inventario.map(item => ({
                    ...item,
                    links: [
                        { rel: 'self', href: `/inventario/${item.id}` },
                        { rel: 'filtros', href: `/inventario/filtros?precio_max=${item.precio + 10000}&precio_min=${item.precio - 10000}` }
                    ]
                })),
                total: resultado.total,
                pagina: resultado.pagina,
                limite: resultado.limite
            };
            
            res.json(HATEOAS);
        } catch (error) {
            console.error('Error en getInventario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    async getInventarioFiltrado(req, res) {
        try {
            const { precio_max, precio_min, categoria, metal } = req.query;
            
            const items = await inventarioModel.getInventarioFiltrado(
                precio_max,
                precio_min,
                categoria,
                metal
            );
            
            res.json(items);
        } catch (error) {
            console.error('Error en getInventarioFiltrado:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

export default inventarioController; 