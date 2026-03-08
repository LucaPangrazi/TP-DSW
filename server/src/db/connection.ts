import { Sequelize } from "sequelize";

// Forzamos la URL pública que copiaste de Railway
const publicUrl = 'mysql://root:CKeh0vxkuAwFtkjnRoxQFihpeoJPIcHB@centerbeam.proxy.rlwy.net:29098/railway';

const sequelize = new Sequelize(publicUrl, {
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

export default sequelize;