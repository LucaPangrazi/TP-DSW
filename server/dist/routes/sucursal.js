import { Router } from 'express';
import { deleteSucursal, getSucursal, getSucursales, postSucursal, updateSucursal } from '../controllers/sucursal';
const routerS = Router();
routerS.get('/', getSucursales);
routerS.get('/:id', getSucursal);
routerS.delete('/:id', deleteSucursal);
routerS.post('/', postSucursal);
routerS.put('/:id', updateSucursal);
export default routerS;
//# sourceMappingURL=sucursal.js.map