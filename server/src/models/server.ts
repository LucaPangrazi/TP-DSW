import express, { Application } from 'express';
import cors from 'cors';
import userRouter from '../routes/user.routes.js';
import db from '../db/connection.js'

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
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
           await db.authenticate();
           console.log('base de datos supuestamente conectada');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;
