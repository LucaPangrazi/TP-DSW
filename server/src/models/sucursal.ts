import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Sucursal = db.define('Sucursal', {
    // Si tenés una columna 'id' en DBeaver, es mejor definirla aquí
    nombre: {
        type: DataTypes.STRING
    },
    localidad: {
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
}, {
    // CONFIGURACIÓN PARA RENDER/RAILWAY
    tableName: 'sucursals',  
    timestamps: false,       
    freezeTableName: true   
});

export default Sucursal;