import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import movieRouter from '../routes/movie';
import salaRouter from '../routes/sala';
import sucursalRouter from '../routes/sucursal';
import userRouter from '../routes/user.routes';
import funcionesRouter from '../routes/funciones.routes';
import homeBannerRouter from '../routes/home-banner.routes';
import compraRouter from '../routes/compra';
import db from '../db/connection'; 
import './associations';

class Server {
  private app: express.Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';
    
    this.dbConnect(); 
    this.middlewares();
    this.routes();
    this.listen();
  }

  async dbConnect() {
    try {
      // Autenticación real con Railway
      await db.authenticate();
      console.log('Base de Datos conectada exitosamente a Railway');
    } catch (error) {
      console.error('ERROR CRÍTICO: No se pudo conectar a la base de datos:', error);
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicación corriendo en el puerto ${this.port}`);
    });
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.json({
        msg: 'API Working'
      });
    });
    this.app.use('/api/movies', movieRouter);
    this.app.use('/api/salas', salaRouter);
    this.app.use('/api/sucursales', sucursalRouter);
    this.app.use('/api/users', userRouter);
    this.app.use('/api/funciones', funcionesRouter);
    this.app.use('/api/home-banner', homeBannerRouter);
    this.app.use('/api/comprar-entrada', compraRouter);
  }

 middlewares() {
    this.app.use(express.json());
    this.app.use(cors()); 

   
    const publicPath = path.join(process.cwd(), 'server', 'uploads');
    
    this.app.use('/uploads', express.static(publicPath));
    
  
    console.log("Servidor buscando imágenes en:", publicPath);
  }
}

export default Server;