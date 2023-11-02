import { Roles } from '../constants.js'
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

export const User = sequelize.define('User', {
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
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role:{
    type: DataTypes.ENUM,
    allowNull: false,
    default: Roles.User
  },
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
}
}, {
  
});

console.log(User === sequelize.models.User);