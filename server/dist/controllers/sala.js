"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSala = exports.postSala = exports.deleteSala = exports.getSala = exports.getSalas = void 0;
const sala_1 = __importDefault(require("../models/sala"));
const getSalas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listSalas = yield sala_1.default.findAll();
        res.json(listSalas);
    }
    catch (error) {
        console.error('Error al obtener salas:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.getSalas = getSalas;
const getSala = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const hall = yield sala_1.default.findByPk(id); //uso async await pq findByPk devuelve una promesa
    if (hall) {
        res.json(hall);
    }
    else {
        res.status(404).json({
            msg: `No existe una sala con el id ${id}`
        });
    }
});
exports.getSala = getSala;
const deleteSala = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const sala = yield sala_1.default.findByPk(id);
    if (!sala) {
        res.status(404).json({
            msg: `No existe una sala con el id ${id}`
        });
    }
    else {
        yield sala.destroy();
        res.json({
            msg: 'La sala fue eliminada con éxito!'
        });
    }
});
exports.deleteSala = deleteSala;
const postSala = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield sala_1.default.create(body);
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
});
exports.postSala = postSala;
const updateSala = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const sala = yield sala_1.default.findByPk(id);
        if (sala) {
            yield sala.update(body);
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
});
exports.updateSala = updateSala;
