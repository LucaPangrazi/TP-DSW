import { Sequelize } from "sequelize";


const sequelize = new Sequelize('dsw_cine', 'root', 'root', {
  host: 'localhost',
  dialect: "mysql",
  //logging:false,  si quisiera que no aparezca el SELECT 1+1
});

export default sequelize