import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || 'cine', 
  process.env.DB_USER || 'cine', 
  process.env.DB_PASSWORD || 'cine', 
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false // Esto permite la conexión segura en Railway
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export default sequelize;