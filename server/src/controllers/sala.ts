import { Request, Response } from "express";
import Sala from '../models/sala';

export const getSalas = async (req:Request, res:Response) => {   //este getSalas es para obtener todas las salas
  const listSalas = await Sala.findAll()

  res.json(listSalas)
}

export const getSala = async (req:Request, res:Response) => {  // y este para obtener una sala en particular
  const {id} = req.params;
  const sala = await Sala.findByPk(id);  //uso async await pq findByPk devuelve una promesa
if (sala) {
  res.json(sala)
} else {
  res.status(404).json({
    msg: `No existe una sala con el id ${id}`
  })
}

}

export const deleteSala = async (req:Request, res:Response) => {
  const {id} = req.params;
  const sala = await Sala.findByPk(id);
  
if (!sala){
  res.status(404).json({
    msg: `No existe una sala con el id ${id}`
  })
} else {
  await sala.destroy();
  res.json({
    msg: 'La sala fue eliminada con éxito!'
  })
  
}

}

export const postSala = async (req:Request, res:Response) => {
  const {body} = req;

  try {
    await Sala.create(body);

  res.json({
    msg:'El producto fue agregado con éxito!'
  })
  } catch (error) {
    console.log(error);
    res.json({
    msg:'Ups, ocurrió un error, comuniquese con soporte'
  })
  }
}

export const updateSala = async (req:Request, res:Response) => {
  const {body} = req;
  const {id} = req.params;

  try {
   const sala = await Sala.findByPk(id);
 
if(sala){
await sala.update(body);
res.json({
  msg: 'La sala fue actualizada con éxito!'
})
} else {
res.status(404).json({
   msg: `No existe una sala con el id ${id}`
})
} 
  } catch (error) {
    console.log(error);
    res.json({
    msg:'Ups, ocurrió un error, comuniquese con soporte'
  })
  }

}