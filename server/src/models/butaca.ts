import { DataTypes } from 'sequelize'
import db from '../db/connection'
import e from 'express';
import Sala from '../models/sala';

const Butaca = db.define('Butaca', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    id_sala: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});
Sala.hasMany(Butaca, {foreignKey: 'id_sala'});

export default Butaca;