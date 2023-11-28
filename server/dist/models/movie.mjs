// En models/movie.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const MovieFormat = {
    f2D: '2D',
    f3D: '3D',
};

const Movie = sequelize.define('Movie', {
    id_movie: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        trim: true
    },
    genre: {
        type: DataTypes.STRING,
        trim: true
    },
    format: {
        type: DataTypes.STRING,
        trim: true
    },
    description: {
        type: DataTypes.STRING,
        trim: true
    },
    clasification: {
        type: DataTypes.STRING,
        trim: true
    },
    durationMin: {
        type: DataTypes.STRING,
        trim: true
    },
    imageUri: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    createdAt: false,
    updatedAt: false
});

module.exports = Movie;
