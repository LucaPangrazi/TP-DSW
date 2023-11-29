import { Router } from "express";
import { deleteMovie, getMovie, getMovies, saveMovie, updateMovie } from '../controllers/movie';

const router = Router();
router.get('/', getMovies);
router.get('/:id', getMovie);
router.delete('/:id', deleteMovie);
router.post('/', saveMovie);
router.put('/:id', updateMovie);

export default router;