import { Sequelize } from "sequelize";


const db = new Sequelize('cine', 'cine', 'cine', {
    host: 'localhost',
    dialect: 'mysql',   
});

export default db;