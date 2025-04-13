import express from 'express';
import joyasController from '../controllers/joyasController.js';
import reportesMiddleware from '../middlewares/reportes.js';

const router = express.Router();

router.get('/joyas', reportesMiddleware, joyasController.getJoyas);
router.get('/joyas/filtros', reportesMiddleware, joyasController.getJoyasFiltradas);

export default router; 