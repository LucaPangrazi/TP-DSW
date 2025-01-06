import { Router } from 'express';
import { enviarCorreo } from '../controllers/email.controller';


const router = Router();

router.post('/enviar-correo', enviarCorreo);

export default router;
