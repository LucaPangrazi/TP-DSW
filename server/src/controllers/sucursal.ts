import {Request, Response} from 'express';
import Sucursal from '../models/sucursal';


export const getSucursales = async(req: Request, res:Response) => {

  const listSucursales = await Sucursal.findAll()
res.json(listSucursales)

}

export const getSucursal = async (req: Request, res:Response) => {

    const {id} = req.params;
    const sucursal = await Sucursal.findByPk(id)

    if(sucursal) {
        res.json(sucursal)
    } else {
        res.status(404).json({
            msg:`No existe una sucursal con el id ${id}`
        })
    }

}

export const deleteSucursal = async (req: Request, res:Response) => {

    const {id} = req.params;
    const sucursal = await Sucursal.findByPk(id);

    if(!sucursal) {
        res.status(404).json({
            msg:`No existe una sucursal con el id ${id}`
        })
    } else {
       await sucursal.destroy();
       res.json({
        msg: 'La sucursal fue eliminada con exito!'
       })
    }

}

export const postSucursal = async (req: Request, res:Response) => {

    const {body} = req;

    try {
        await Sucursal.create(body);


        res.json({
           
            msg: `La sucursal fue agregada con exito!`
            
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg:`Ups ocurrio un error comuniquese con soporte`
        })
    }

   
}

export const updateSucursal = async(req: Request, res:Response) => {
   
    const {body} = req;
    const {id} = req.params;
    
    try {
        const sucursal = await Sucursal.findByPk(id);

    if(sucursal) {
     await sucursal.update(body)
        res.json({
            msg:'La sucursal fue actualizada con exito'
        }) 
    
    } else {
        res.status(404).json({
            msg:`No existe una sucursal con el id ${id}`
    })
    }
    } catch (error) {
        console.log(error);
        res.json({
            msg:`Ups ocurrio un error comuniquese con soporte`
        })
    }

    
}