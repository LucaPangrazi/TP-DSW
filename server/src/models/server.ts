import express, { Application , Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import routeMovie from '../routes/movie';
import router from '../routes/sala';
import routerS from '../routes/sucursal';
import userRouter from '../routes/user.routes';
import db from '../db/connection';

class Server {
private app: Application;
private port: string;

constructor(){
  this.app = express();
  this.port = process.env.PORT || '3000';
  this.listen();
  this.midlewares();
  this.routes();
  this.dbConnect();
}
listen() {
this.app.listen(this.port, () => {
console.log(`Aplicación corriendo en el puerto ${this.port}`)
})
}

routes() {
    this.app.get('/', (req:Request , res:Response ) => {
      res.json({
        msg: 'API Working'
      })
    })
    this.app.use('/api/movies', routeMovie);
    this.app.use('/api/salas', router);
    this.app.use('/api/sucursales', routerS);
    this.app.use('/api/users', userRouter);
    
  }
  
  midlewares() {
    //parseamos el body
    this.app.use(express.json());
    //Cors
    this.app.use(cors());
    
    this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  }

 async dbConnect() {

  try{
 await db.sync();
  console.log('Base de Datos conectada')
  }
 catch (error) {
  console.log(error);
  console.log('Error al conectarse a la base de datos')
 }
 }
}
 export default Server;