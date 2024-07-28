import express from 'express';
import cors from 'cors';
import path from 'path';
import movieRouter from '../routes/movie';
import salaRouter from '../routes/sala';
import sucursalRouter from '../routes/sucursal';
import userRouter from '../routes/user.routes';
import detallePeliculaRouter from '../routes/detalle-pelicula'; 
import db from '../db/connection';

class Server {
  private app: express.Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.listen();
    this.middlewares();
    this.routes();
    this.dbConnect();
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
    this.app.use('/api/movies', detallePeliculaRouter); 
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
  }

  async dbConnect() {
    try {
      await db.sync();
      console.log('Base de Datos conectada');
    } catch (error) {
      console.log('Error al conectarse a la base de datos', error);
    }
  }
}

export default Server;
