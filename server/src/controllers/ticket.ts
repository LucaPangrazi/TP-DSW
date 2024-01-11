import { Request, Response } from "express";
import Ticket from '../models/ticket';

export const getTicket = async (req:Request, res:Response) => { 
  const {id} = req.params;
  const hall = await Ticket.findByPk(id);
if (hall) {
  res.json(hall)
} else {
  res.status(404).json({
    msg: `No existe un ticket con el id ${id}`
  })
}
}

export const postTicket = async (req:Request, res:Response) => {
    const {body} = req;
  
    try {
      await Ticket.create(body);
  
    res.json({
      msg:'Ticket validado!'
    })
    } catch (error) {
      console.log(error);
      res.json({
      msg:'Ups, ocurrió un error, comuniquese con soporte'
    })
    }
  }

  export const deleteTicket = async (req:Request, res:Response) => {
    const {id} = req.params;
    const ticket = await Ticket.findByPk(id);
    
  if (!ticket){
    res.status(404).json({
      msg: `No existe el ticket`
    })
  } else {
    await ticket.destroy();
    res.json({
      msg: 'Compra cancelada exitosamente!'
    })
    
  }
  
  }