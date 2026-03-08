import { Sequelize } from "sequelize";
import 'dotenv/config';

// Usamos la MYSQL_PUBLIC_URL que copiaste de Railway
// Esta URL ya contiene: usuario, contraseña, host, puerto y nombre de la base de datos.
const databaseUrl = process.env.DATABASE_URL || 'mysql://root:CKeh0vxkuAwFtkjnRoxQFihpeoJPIcHB@centerbeam.proxy.rlwy.net:29098/railway';

console.log("DEBUG: Intentando conectar a la base de datos de Railway...");

const sequelize = new Sequelize(databaseUrl, {
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      // Esto es fundamental para conexiones externas a Railway
      rejectUnauthorized: false
    }
  },
  // Opcional: Para ver las consultas en la consola de Render
  logging: false 
});

export default sequelize;