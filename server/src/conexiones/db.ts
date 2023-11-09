import { Sequelize } from "sequelize";


const sequelize = new Sequelize('cine', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',   
});

export default sequelize;