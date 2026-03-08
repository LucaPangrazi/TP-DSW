import db from '../db/connection.js'
import { Sequelize, DataTypes } from 'sequelize';

const User = db.define('User', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('User', 'Admin'),
    allowNull: false,
    defaultValue: 'User'
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
}, {
  // CONFIGURACIÓN CLAVE PARA RENDER/RAILWAY
  tableName: 'users',     
  timestamps: false,       
  freezeTableName: true    
});

export default User;