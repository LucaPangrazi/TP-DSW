"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const movie_1 = __importDefault(require("../routes/movie"));
const sala_1 = __importDefault(require("../routes/sala"));
const sucursal_1 = __importDefault(require("../routes/sucursal"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const detalle_pelicula_1 = __importDefault(require("../routes/detalle-pelicula"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
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
        this.app.use('/api/movies', movie_1.default);
        this.app.use('/api/salas', sala_1.default);
        this.app.use('/api/sucursales', sucursal_1.default);
        this.app.use('/api/users', user_routes_1.default);
        this.app.use('/api/movies', detalle_pelicula_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../../uploads')));
    }
    async dbConnect() {
        try {
            await connection_1.default.sync();
            console.log('Base de Datos conectada');
        }
        catch (error) {
            console.log('Error al conectarse a la base de datos', error);
        }
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map