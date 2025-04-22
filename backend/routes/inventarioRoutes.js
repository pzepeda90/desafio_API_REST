import express from 'express';
import inventarioController from '../controllers/inventarioController.js';
import reportesMiddleware from '../middlewares/reportes.js';

const router = express.Router();

router.get('/inventario', reportesMiddleware, inventarioController.getInventario);
router.get('/inventario/filtros', reportesMiddleware, inventarioController.getInventarioFiltrado);

export default router; 