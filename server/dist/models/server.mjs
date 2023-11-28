"use strict";

import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import movieRoutes from '../routes/movie.mjs';
import salaRoutes from '../routes/sala.mjs';
import sucursalRoutes from '../routes/sucursal.mjs';

// Construye la ruta absoluta al módulo db/connection.mjs
const dbConnectionPath = path.resolve(__dirname, 'db/connection.mjs');
import dbConnection from dbConnectionPath;

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3001';
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
        msg: 'API Working',
      });
    });

    this.app.use('/api/movies', movieRoutes());
    this.app.use('/api/salas', salaRoutes());
    this.app.use('/api/sucursales', sucursalRoutes());

    // Servir archivos estáticos (imágenes, etc.)
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  middlewares() {
    // parseamos el body
    this.app.use(express.json());

    // Cors
    this.app.use(cors());
    // Descomenta las siguientes líneas si necesitas manejar archivos temporales
    /*
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: './uploads',
      })
    );
    */
  }

  async dbConnect() {
    try {
      await dbConnection.authenticate();
      console.log("Base de Datos conectada");
    } catch (error) {
      console.error("Error al conectarse a la base de datos:", error);
      console.log("Error al conectarse a la base de datos");
    }
  }
}

export default Server;
