import { Sequelize } from "sequelize";
const sequelize = new Sequelize('cine', 'cine', 'cine', {
    host: 'localhost',
    dialect: "mysql",
    //logging:false,  si quiero que no aparezca el SELECT 1+1
});
export default sequelize;
//# sourceMappingURL=connection.js.map