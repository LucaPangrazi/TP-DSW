import { DataTypes } from 'sequelize';
import db from '../db/connection';
import { MovieAttributes } from '../interfaces/movie-attributes';

const Movie = db.define('Movie', {
  id_movie: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING
  },
  genre: {
    type: DataTypes.STRING
  },
  format: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  clasification: {
    type: DataTypes.STRING
  },
  durationMin: {
    type: DataTypes.INTEGER
  },
  image: {
    type: DataTypes.STRING
  }
}, {
  // CONFIGURACIÓN PARA RENDER/RAILWAY
  tableName: 'movies',      
  timestamps: false,        
  freezeTableName: true   
});

export default Movie;