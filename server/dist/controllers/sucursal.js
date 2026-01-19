"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSucursal = exports.postSucursal = exports.deleteSucursal = exports.getSucursal = exports.getSucursales = void 0;
const sucursal_1 = __importDefault(require("../models/sucursal"));
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const getSucursales = async (req, res) => {
    try {
        const { peliculaId } = req.query;
        if (peliculaId) {
            const listSucursales = await connection_1.default.query('SELECT DISTINCT s.* FROM sucursals s JOIN funtion f ON s.id = f.sucursal_id WHERE f.movie_id = ?', {
                replacements: [peliculaId],
                type: sequelize_1.QueryTypes.SELECT
            });
            res.json(listSucursales);
        }
        else {
            const listSucursales = await sucursal_1.default.findAll();
            res.json(listSucursales);
        }
    }
    catch (error) {
        console.error('Error al obtener sucursales:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};
exports.getSucursales = getSucursales;
const getSucursal = async (req, res) => {
    const { id } = req.params;
    const sucursal = await sucursal_1.default.findByPk(id);
    if (sucursal) {
        res.json(sucursal);
    }
    else {
        res.status(404).json({
            msg: `No existe una sucursal con el id ${id}`
        });
    }
};
exports.getSucursal = getSucursal;
const deleteSucursal = async (req, res) => {
    const { id } = req.params;
    const sucursal = await sucursal_1.default.findByPk(id);
    if (!sucursal) {
        res.status(404).json({
            msg: `No existe una sucursal con el id ${id}`
        });
    }
    else {
        await sucursal.destroy();
        res.json({
            msg: 'La sucursal fue eliminada con exito!'
        });
    }
};
exports.deleteSucursal = deleteSucursal;
const postSucursal = async (req, res) => {
    const { body } = req;
    try {
        await sucursal_1.default.create(body);
        res.json({
            msg: `La sucursal fue agregada con exito!`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Ups ocurrio un error comuniquese con soporte`
        });
    }
};
exports.postSucursal = postSucursal;
const updateSucursal = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const sucursal = await sucursal_1.default.findByPk(id);
        if (sucursal) {
            await sucursal.update(body);
            res.json({
                msg: 'La sucursal fue actualizada con exito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe una sucursal con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Ups ocurrio un error comuniquese con soporte`
        });
    }
};
exports.updateSucursal = updateSucursal;
//# sourceMappingURL=sucursal.js.map