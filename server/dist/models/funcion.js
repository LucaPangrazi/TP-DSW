"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Funcion = connection_1.default.define('Funcion', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    movie_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    sala_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    sucursal_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    fecha_funcion: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    hora_funcion: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    }
}, {
    tableName: 'funtion',
    timestamps: false
});
exports.default = Funcion;
//# sourceMappingURL=funcion.js.map