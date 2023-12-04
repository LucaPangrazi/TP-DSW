import { DataTypes } from 'sequelize';
import db from '../db/connection';
import e from 'express';



const Sucursal = db.define('Sucursal', {

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
     type: DataTypes.STRING
    },

    localidad: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },

}, {
    createdAt:false,
    updatedAt:false

});

export default Sucursal;