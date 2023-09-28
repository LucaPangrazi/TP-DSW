import { Roles } from '../constants.js'
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

//export class User {
 // constructor(
   // public nombre: string,
   // public apellido: string,
   // public dni: number,
   // public telefono: number,
   // public contraseña: string,
   // public id = crypto.randomUUID()
  //) {}
//}



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
    type: DataTypes.NUMBER,
    allowNull: false
  },
  telefono: {
    type: DataTypes.NUMBER
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
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
}
}, {
  
});

console.log(User === sequelize.models.User);