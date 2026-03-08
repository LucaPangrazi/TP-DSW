import { Sequelize } from "sequelize";
import 'dotenv/config';

console.log("DEBUG: Intentando conectar a:", process.env.DB_HOST, "Puerto:", process.env.DB_PORT);

const sequelize = new Sequelize(
  process.env.DB_NAME || 'railway', 
  process.env.DB_USER || 'root', 
  process.env.DB_PASSWORD || 'CKeh0vxkuAwFtkjnRoxQFihpeoJPIcHB', // Pegala acá directo para probar
  {
    host: process.env.DB_HOST || 'centerbeam.proxy.rlwy.net', 
    port: Number(process.env.DB_PORT) || 29098,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
);

export default sequelize;