import { Router } from 'express';
import { getHorarios, getAsientosOcupados, postGuardarAsientos, getFunciones, 
  getFuncionById, postFuncion, updateFuncion, deleteFuncion, buscarIdFuncion } from '../controllers/funcion.controller';

const router = Router();

router.get('/', getHorarios);
router.get('/asientos', getAsientosOcupados);
router.post('/guardar-asientos', postGuardarAsientos);
router.get('/buscar', buscarIdFuncion);

// Rutas CRUD (Panel de Admin)
router.get('/all', getFunciones);
router.get('/:id', getFuncionById);
router.post('/', postFuncion);
router.put('/:id', updateFuncion);
router.delete('/:id', deleteFuncion);

export default router;