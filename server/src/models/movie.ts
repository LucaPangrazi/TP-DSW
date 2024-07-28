import { DataTypes } from 'sequelize';
import db from '../db/connection';
import { MovieAttributes } from '../interfaces/movie-attributes';
import { MovieModel } from './movie-model';

const Movie = db.define<MovieModel>('Movie', {
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
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  }
}, {
  createdAt: false,
  updatedAt: false
});

export default Movie;
