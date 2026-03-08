"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Esta lógica elige las credenciales de Railway si existen, 
// o usa las de 'cine' si estás en tu compu (localhost).
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'cine', process.env.DB_USER || 'cine', process.env.DB_PASSWORD || 'cine', {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    // Railway y Render suelen requerir configuraciones de pool para no saturar
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
exports.default = sequelize;
//# sourceMappingURL=connection.js.map