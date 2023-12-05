import {Router} from 'express';
import { deleteSucursal, getSucursal, getSucursales, postSucursal, updateSucursal } from '../controllers/sucursal';


const routerSuc = Router();

routerSuc.get('/', getSucursales)
routerSuc.get('/:id', getSucursal)
routerSuc.delete('/:id', deleteSucursal)
routerSuc.post('/', postSucursal)
routerSuc.put('/:id', updateSucursal)

export default routerSuc;