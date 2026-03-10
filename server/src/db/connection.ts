import { Sequelize } from "sequelize";

//URL pública de railway
const publicUrl = 'mysql://admin_cinetix:PasswordSegura123@centerbeam.proxy.rlwy.net:29098/railway';
console.log("LOG DE CONTROL: Intentando conectar con URL Hardcodeada v2");
const sequelize = new Sequelize(publicUrl, {
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

export default sequelize;