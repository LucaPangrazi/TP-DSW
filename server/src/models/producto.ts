import { DataTypes } from 'sequelize';
import db from '../db/connection';



const Sucursal = db.define('Sucursales', {

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