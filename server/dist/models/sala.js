'use strict';

const { DataTypes } = require('sequelize');
const connection = require('../db/connection');

const Sala = connection.define('Sala', {
    name: {
        type: DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false
});

module.exports = Sala;

