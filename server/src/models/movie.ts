import { DataTypes } from 'sequelize'
import db from '../db/connection'

enum MovieFormat {
  f2D='2D',
  f3D='3D'//varchar(10) en bd 
}
const Movie = db.define('Movie', {
  id_movie:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  title:{
      type: DataTypes.STRING
  },
  genre:{
      type: DataTypes.STRING
  },
  format:{
      type: DataTypes.STRING 
  },
  description:{
      type: DataTypes.STRING
  },
  clasification:{
      type: DataTypes.STRING
  },
  durationMin:{
      type: DataTypes.STRING //min : si pido que el usuario me ingrese hora y min puedo convertirlo desde angular a min
    }
}, {
 createdAt: false,
 updatedAt: false
}
);
export default Movie;