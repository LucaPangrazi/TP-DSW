
import { DataTypes } from 'sequelize';
import db from '../db/connection';

const HomeBanner = db.define('HomeBanner', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'movie_id no puede estar vacío'
            }
        }
    },
    custom_image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'custom_image no puede estar vacío'
            }
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'home_banner',
    timestamps: false
});

export default HomeBanner;
