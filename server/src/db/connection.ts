import { Sequelize } from "sequelize";

const sequelize = new Sequelize('cine', 'cine', 'cine', {
  host: 'localhost', //127.0.0.1
  dialect: "mysql",
  //logging:false,  si quiero que no aparezca el SELECT 1+1
});

export default sequelize