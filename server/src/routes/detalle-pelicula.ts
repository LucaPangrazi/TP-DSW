import { Router } from 'express';
import { getMovieById } from '../controllers/detalle-pelicula';

const router = Router();


router.get('/:id', getMovieById);

export default router;