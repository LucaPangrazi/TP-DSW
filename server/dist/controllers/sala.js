"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSala = exports.postSala = exports.deleteSala = exports.getSala = exports.getSalas = void 0;
const sala_1 = __importDefault(require("../models/sala"));
const getSalas = async (req, res) => {
    try {
        const listSalas = await sala_1.default.findAll();
        res.json(listSalas);
    }
    catch (error) {
        console.error('Error al obtener salas:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};
exports.getSalas = getSalas;
const getSala = async (req, res) => {
    const { id } = req.params;
    const hall = await sala_1.default.findByPk(id);
    if (hall) {
        res.json(hall);
    }
    else {
        res.status(404).json({
            msg: `No existe una sala con el id ${id}`
        });
    }
};
exports.getSala = getSala;
const deleteSala = async (req, res) => {
    const { id } = req.params;
    const sala = await sala_1.default.findByPk(id);
    if (!sala) {
        res.status(404).json({
            msg: `No existe una sala con el id ${id}`
        });
    }
    else {
        await sala.destroy();
        res.json({
            msg: 'La sala fue eliminada con éxito!'
        });
    }
};
exports.deleteSala = deleteSala;
const postSala = async (req, res) => {
    const { body } = req;
    try {
        await sala_1.default.create(body);
        res.json({
            msg: 'La sala fue agregada con éxito!'
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ups, ocurrió un error, comuniquese con soporte'
        });
    }
};
exports.postSala = postSala;
const updateSala = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const sala = await sala_1.default.findByPk(id);
        if (sala) {
            await sala.update(body);
            res.json({
                msg: 'La sala fue actualizada con éxito!'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe una sala con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ups, ocurrió un error, comuniquese con soporte'
        });
    }
};
exports.updateSala = updateSala;
//# sourceMappingURL=sala.js.map