import {Router} from 'express';
import { deleteSucursal, getSucursal, getSucursales, postSucursal, updateSucursal } from '../controllers/sucursal';

const router = Router();
router.get('/', getSucursales)
router.get('/:id', getSucursal)
router.delete('/:id', deleteSucursal)
router.post('/', postSucursal)
router.put('/:id', updateSucursal)

export default router;