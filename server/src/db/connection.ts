
 import { Sequelize } from "sequelize";


const sequelize = new Sequelize('cine', 'cine', 'cine', {
  host: 'localhost', //127.0.0.1
  dialect: "mysql",
  logging:false,  
});

export default sequelize

