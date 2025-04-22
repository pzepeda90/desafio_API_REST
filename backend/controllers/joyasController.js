import joyasModel from '../models/joyas.js';

const formatHATEOAS = (joyas) => {
    return joyas.map(joya => ({
        name: joya.nombre,
        href: `/joyas/joya/${joya.id}`
    }));
};

const joyasController = {
    async getJoyas(req, res) {
        try {
            // Obtener y validar parámetros de la query
            const limits = req.query.limits ? parseInt(req.query.limits) : 10;
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const order_by = req.query.order_by || 'id_ASC';
            
            // Obtener datos del modelo
            const resultado = await joyasModel.getJoyas(limits, page, order_by);
            
            // Crear respuesta con formato HATEOAS
            const respuesta = {
                totalJoyas: resultado.totalJoyas,
                stockTotal: resultado.stockTotal,
                results: formatHATEOAS(resultado.joyas)
            };
            
            res.json(respuesta);
        } catch (error) {
            console.error('Error en getJoyas:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor',
                message: error.message 
            });
        }
    },

    async getJoyasFiltradas(req, res) {
        try {
            // Extraer parámetros de filtro
            const { precio_max, precio_min, categoria, metal } = req.query;
            
            // Validar que al menos hay un parámetro de filtro
            if (!precio_max && !precio_min && !categoria && !metal) {
                return res.status(400).json({ 
                    error: 'Se requiere al menos un parámetro de filtro (precio_max, precio_min, categoria, metal)' 
                });
            }
            
            // Convertir los parámetros numéricos si existen
            const filtros = {
                precio_max: precio_max ? parseInt(precio_max) : null,
                precio_min: precio_min ? parseInt(precio_min) : null,
                categoria,
                metal
            };
            
            // Obtener joyas filtradas
            const joyas = await joyasModel.getJoyasFiltradas(
                filtros.precio_max,
                filtros.precio_min,
                filtros.categoria,
                filtros.metal
            );
            
            // Si no hay resultados, enviar mensaje específico
            if (joyas.length === 0) {
                return res.status(200).json([]);
            }
            
            res.json(joyas);
        } catch (error) {
            console.error('Error en getJoyasFiltradas:', error);
            res.status(500).json({ 
                error: 'Error interno del servidor',
                message: error.message 
            });
        }
    }
};

export default joyasController; 