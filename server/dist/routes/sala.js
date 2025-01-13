import { Router } from "express";
import { deleteSala, getSala, getSalas, postSala, updateSala } from "../controllers/sala";
const router = Router();
router.get('/', getSalas);
router.get('/:id', getSala);
router.delete('/:id', deleteSala);
router.post('/', postSala);
router.put('/:id', updateSala);
export default router;
//# sourceMappingURL=sala.js.map