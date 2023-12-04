import { Router } from 'express'
import { loginUser, newUser, editUser, allUsers, deleteUser } from '../controllers/user.controler.js';


const userRouter = Router();

userRouter.post('/register', newUser);
userRouter.get('/', allUsers);
userRouter.post('/login', loginUser);
userRouter.put('/update', editUser);
userRouter.delete('/delete', deleteUser);

export default userRouter;