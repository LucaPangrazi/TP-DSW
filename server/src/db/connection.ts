import { Sequelize } from "sequelize";

// Forzamos la URL pública que copiaste de Railway
const publicUrl = 'mysql://root:CKeh0vxkuAwFtkjnRoxQFihpeoJPIcHB@centerbeam.proxy.rlwy.net:29098/railway';

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