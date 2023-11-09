import { Router } from 'express'
import { loginUser, newUser, editUser } from '../controladores/user.controler.js';

const router = Router();

router.post('/register', newUser);
router.post('/login', loginUser);
router.put('/update', editUser);
//router.delete('/delete', deleteUser);

export default router;