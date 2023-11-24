"use strict";
const express_1 = require("express");
const cors_1 = require("cors");
const sucursal_1 = require("../routes/sucursal");
const connection_1 = require("../db/connection");

const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const movieRoutes = require('../routes/movie').default;
const salaRoutes = require('../routes/sala').default;
const sucursalRoutes = require('../routes/sucursal').default;
const dbConnection = require('../db/connection');

class Server {
  constructor() {
    this.app = express_1.default();
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

module.exports = Server;
