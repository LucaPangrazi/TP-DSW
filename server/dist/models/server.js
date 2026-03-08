"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const movie_1 = __importDefault(require("../routes/movie"));
const sala_1 = __importDefault(require("../routes/sala"));
const sucursal_1 = __importDefault(require("../routes/sucursal"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const funciones_routes_1 = __importDefault(require("../routes/funciones.routes"));
const home_banner_routes_1 = __importDefault(require("../routes/home-banner.routes"));
const compra_1 = __importDefault(require("../routes/compra"));
const connection_1 = __importDefault(require("../db/connection"));
require("./associations");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.dbConnect();
        this.middlewares();
        this.routes();
        this.listen();
    }
    async dbConnect() {
        try {
            // Autenticación real con Railway
            await connection_1.default.authenticate();
            console.log('Base de Datos conectada exitosamente a Railway');
        }
        catch (error) {
            console.error('ERROR CRÍTICO: No se pudo conectar a la base de datos:', error);
            // Opcional: process.exit(1) para que el servidor no quede "colgado" si falla la DB
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
        this.app.use('/api/movies', movie_1.default);
        this.app.use('/api/salas', sala_1.default);
        this.app.use('/api/sucursales', sucursal_1.default);
        this.app.use('/api/users', user_routes_1.default);
        this.app.use('/api/funciones', funciones_routes_1.default);
        this.app.use('/api/home-banner', home_banner_routes_1.default);
        this.app.use('/api/comprar-entrada', compra_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        // CORS habilitado para que el Front de Render pueda hablar con este Back
        this.app.use((0, cors_1.default)());
        this.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../../uploads')));
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map