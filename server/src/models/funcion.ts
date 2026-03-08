import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Funcion = db.define('Funcion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sala_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sucursal_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_funcion: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora_funcion: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    tableName: 'funtion',   
    timestamps: false,     
    freezeTableName: true   
});

export default Funcion;