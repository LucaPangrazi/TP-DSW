"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
var MovieFormat;
(function (MovieFormat) {
    MovieFormat["f2D"] = "2D";
    MovieFormat["f3D"] = "3D"; //varchar(10) en bd 
})(MovieFormat || (MovieFormat = {}));
const Movie = connection_1.default.define('Movie', {
    id_movie: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        trim: true
    },
    genre: {
        type: sequelize_1.DataTypes.STRING,
        trim: true
    },
    format: {
        type: sequelize_1.DataTypes.STRING,
        trim: true
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        trim: true
    },
    clasification: {
        type: sequelize_1.DataTypes.STRING,
        trim: true
    },
    durationMin: {
        type: sequelize_1.DataTypes.STRING, //min : si pido que el usuario me ingrese hora y min puedo convertirlo desde angular a min
        trim: true
    },
    imageUri: {
        type: sequelize_1.DataTypes.STRING,
       // type: sequelize_1.DataTypes.JSON, // Utiliza JSONB para almacenar objetos JSON en PostgreSQL
        allowNull: false,
    }
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Movie;
