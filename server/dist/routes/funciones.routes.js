"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const { peliculaId, fecha } = req.query;
    if (!peliculaId || !fecha) {
        return res.status(400).json({ error: 'Faltan parámetros' });
    }
    try {
        const resultados = await connection_1.default.query('SELECT horario FROM funciones WHERE id_pelicula = ? AND fecha = ? ORDER BY horario', {
            replacements: [peliculaId, fecha],
            type: sequelize_1.QueryTypes.SELECT,
        });
        res.json(resultados.map((row) => row.horario));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener funciones' });
    }
});
router.get('/test', (req, res) => {
    res.json({ msg: 'Funciona el router de funciones!' });
});
exports.default = router;
//# sourceMappingURL=funciones.routes.js.map