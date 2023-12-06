import { Router } from 'express'
import { loginUser, newUser, editUser, allUsers } from '../controllers/user.controler.js';


const userRouter = Router();


userRouter.post('/register', newUser);
userRouter.get('/', allUsers);
userRouter.post('/login', loginUser);
userRouter.put('/update', editUser);
//router.delete('/delete', deleteUser);

export default userRouter;