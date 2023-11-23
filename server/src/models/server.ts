import express, { Application } from 'express';
import cors from 'cors';
import userRouter from '../routes/user.routes.js';
import sequelize from '../conexiones/connection.js'

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        })
    }

    routes() {
        this.app.use('/api/users', userRouter);
    }

    midlewares() {
        // Parse body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }

    async dbConnect() {
        try {
           await sequelize.authenticate();
           console.log('base de datos supuestamente conectada');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;