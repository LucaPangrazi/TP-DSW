import { DataTypes } from 'sequelize'
import db from '../db/connection'
import e from 'express';

const Sala = db.define('Sala', {
  
  name: {
    type:DataTypes.STRING
  }

}, {
 createdAt: false,
 updatedAt: false
}
);

export default Sala;
