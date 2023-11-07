import { Router } from 'express'
import { loginUser, newUser, editUser, deleteUser } from '../controladores/user.controler.js';

const router = Router();

router.post('/', newUser);
router.post('/login', loginUser);
router.put('/update', editUser);
router.delete('/delete', deleteUser);

export default router;