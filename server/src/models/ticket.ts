import { DataTypes, Sequelize } from 'sequelize';
import db from '../db/connection';
import Sala from '../models/sala';
import Movie from '../models/movie';
import e from 'express';

const Ticket = db.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    butaca: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_sala: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_movie: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
Sala.hasMany(Ticket, {foreignKey: 'id_sala'});
Movie.hasMany(Ticket, {foreignKey: 'id:_movie'});

export default Ticket;