import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../entidades/user.entity.js'
import jwt from 'jsonwebtoken'
import { Roles } from '../constants.js'


export const newUser = async (req: Request, res: Response) => {

  const { nombre, apellido, userName, dni, telefono, password } = req.body;


  const user = await User.findOne({ where: { userName: userName } });

  if(user) {
     return res.status(400).json({
          msg: `Ya existe un usuario con ese nombre de usuario registrado`
      })
  } 

  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
      await User.create({
        nombre: nombre,
        apellido: apellido,
        userName: userName,
        dni: dni,
        telefono: telefono,
        password: hashedPassword
      })
  
      res.json({
          msg: `Usuario ${userName} creado exitosamente!`
      })
  } catch (error) {
      res.status(400).json({
          msg: 'Upps ocurrio un error',
          error
      })
  }
}

export const loginUser = async (req: Request, res: Response) => {

  const { username, password } = req.body;

 const user: any = await User.findOne({ where: { username: username } });

 if(!user) {
      return res.status(400).json({
          msg: `No existe un usuario con el nombre ${username} en la base datos`
      })
 }

 
 const passwordValid = await bcrypt.compare(password, user.password)
 if(!passwordValid) {
  return res.status(400).json({
      msg: `Password Incorrecta`
  })
 }
 const token = jwt.sign({
  username: username
 }, process.env.SECRET_KEY ?? 'ClaveSuperSegura1234');
 
 res.json(token);
}


 export const editUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user: any = await User.findOne({ where: { id: id } });

    const { username, telefono, password } = req.body;

    if(!user) {
        return res.status(400).json({
            msg: `No existe el usuario`
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {

        user.userName = username;
        user.telefono = telefono;
        user.password = hashedPassword;

        await user.save();
    
        res.json({
            msg: `Usuario ${username} actualizado exitosamente!`
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }

 }

 //export const deleteUser = async (req: Request, res: Response) => {

  //  const { id } = req.params;

  //  const user = await User.findOne({ where: { id: id } })

  //  await user.destroy();

 // }

 