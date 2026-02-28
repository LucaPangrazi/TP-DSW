import { Router } from 'express';
import { enviarResumenCompra } from '../controllers/compra';

const router = Router();

router.post('/:id/enviar-resumen', enviarResumenCompra);

export default router;
