
import db from '../db/connection.js'
import { Sequelize, DataTypes } from 'sequelize';
import e from 'express';

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
  role:{
    type: DataTypes.ENUM('User', 'Admin'),
    allowNull: false,
    defaultValue: 'User'
  },
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
}
}, {
  
});
export default User;
console.log(User === db.models.User);
