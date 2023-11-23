import { Sequelize } from "sequelize";


const db = new Sequelize('cine', 'cine', 'cine', {
  host: 'localhost',
  dialect: "mysql",
  //logging:false,  si quisiera que no aparezca el SELECT 1+1
});

export default db
