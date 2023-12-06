"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('cine', 'cine', 'cine', {
    host: 'localhost', //127.0.0.1
    dialect: "mysql",
    //logging:false,  si quiero que no aparezca el SELECT 1+1
});
exports.default = sequelize;
