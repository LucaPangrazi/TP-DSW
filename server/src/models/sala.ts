import { DataTypes } from 'sequelize'
import db from '../db/connection'

const Sala = db.define('Sala', {
  id: { // Agregamos el id si es que lo tenés como PK en DBeaver
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  // CONFIGURACIÓN PARA RENDER/RAILWAY
  tableName: 'salas',      
  timestamps: false,       
  freezeTableName: true   
});

export default Sala;