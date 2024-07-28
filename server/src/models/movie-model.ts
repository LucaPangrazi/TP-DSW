import { Model } from 'sequelize';
import { MovieAttributes } from '../interfaces/movie-attributes';

// Define un modelo con los atributos de la película
export interface MovieModel extends Model<MovieAttributes>, MovieAttributes {}
