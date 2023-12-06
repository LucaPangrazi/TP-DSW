import { Request, Response } from 'express'
import User from '../models/user.entity.js'
const jwt=require('jsonwebtoken');

export const allUsers = async (req:Request, res:Response) => {
    const users = await User.findAll();
    res.json({
        msg: `get funciona`,
        return: users
    })
}

export const newUser = async (req: Request, res: Response) => {

  const { nombre, apellido, userName, dni, telefono, password } = req.body;


  const user = await User.findOne({ where: { userName: userName } });

  if(user) {
    return res.status(400).json({
         msg: `Ya existe un usuario con ese nombre de usuario registrado`
   })
     } 

  
  
  try {
      await User.create({
        nombre: nombre,
        apellido: apellido,
        userName: userName,
        dni: dni,
        telefono: telefono,
        password: password
      })
  
      res.json({
          msg: `Usuario ${userName} creado exitosamente!`
      })
  } catch (error) {
      res.status(400).json({
          msg: `Upps ocurrio un error`,
          error
      })
  }
}

export const loginUser = async (req: Request, res: Response) => {

  const { userName, password } = req.body;

 const user: any = await User.findOne({ where: { userName: userName } });

 if(!user) {
      return res.status(400).json({
          msg: `No existe un usuario con el nombre ${userName} en la base datos`
      })
 }
var passwordValid = false;
 if (user.password === password){
    passwordValid = true;
 }
 if(!passwordValid) {
  return res.status(400).json({
      msg: `Password Incorrecta`
  })
 }
const token = jwt.sign({ 
  userName: userName 
 }, process.env.SECRET_KEY ?? 'ClaveSuperSegura1234');
 
  res.json(token);
}


 export const editUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user: any = await User.findOne({ where: { id: id } });

    const { userName, telefono, password } = req.body;

    if(!user) {
        return res.status(400).json({
            msg: `No existe el usuario`
        })
    }

    try {

        user.userName = userName;
        user.telefono = telefono;
        user.password = password;

        await user.save();
    
        res.json({
            msg: `Usuario ${userName} actualizado exitosamente!`
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }

 }

 export const deleteUser = async (req: Request, res: Response) => {

const { id } = req.params;

   const user = await User.findOne({ where: { id: id } })
   
   if(!user) {
    return res.status(400).json({
        msg: `No existe el usuario`
    })
    }
    else{
        await user.destroy();
    }
   

  }

 