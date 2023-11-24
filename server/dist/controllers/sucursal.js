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
exports.updateSucursal = exports.postSucursal = exports.deleteSucursal = exports.getSucursal = exports.getSucursales = void 0;
const sucursal_1 = __importDefault(require("../models/sucurlsal"));
const getSucursales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listSucursales = yield sucursal_1.default.findAll();
    res.json(listSucursales);
});
exports.getSucursales = getSucursales;
const getSucursal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const sucursal = yield sucursal_1.default.findByPk(id);
    if (sucursal) {
        res.json(sucursal);
    }
    else {
        res.status(404).json({
            msg: `No existe una sucursal con el id ${id}`
        });
    }
});
exports.getSucursal = getSucursal;
const deleteSucursal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const sucursal = yield sucursal_1.default.findByPk(id);
    if (!sucursal) {
        res.status(404).json({
            msg: `No existe una sucursal con el id ${id}`
        });
    }
    else {
        yield sucursal.destroy();
        res.json({
            msg: 'La sucursal fue eliminada con exito!'
        });
    }
});
exports.deleteSucursal = deleteSucursal;
const postSucursal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield sucursal_1.default.create(body);
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
});
exports.postSucursal = postSucursal;
const updateSucursal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const sucursal = yield sucursal_1.default.findByPk(id);
        if (sucursal) {
            yield sucursal.update(body);
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
});
exports.updateSucursal = updateSucursal;
