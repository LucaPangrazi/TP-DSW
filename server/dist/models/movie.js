import { DataTypes } from 'sequelize';
import db from '../db/connection';
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
//# sourceMappingURL=movie.js.map