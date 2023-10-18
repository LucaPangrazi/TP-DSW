"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('dsw_cine', 'root', 'root', {
    host: 'localhost',
    dialect: "mysql",
    //logging:false,  si quisiera que no aparezca el SELECT 1+1
});
exports.default = sequelize;
