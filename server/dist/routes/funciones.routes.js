"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const funcion_1 = __importDefault(require("../models/funcion"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const { peliculaId, fecha, sucursalId } = req.query;
    if (!peliculaId || !fecha) {
        return res.status(400).json({ error: 'Faltan parámetros' });
    }
    try {
        let query = 'SELECT hora_funcion as horario FROM funtion WHERE movie_id = ? AND fecha_funcion = ? ';
        const replacements = [peliculaId, fecha];
        if (sucursalId) {
            query += 'AND sucursal_id = ? ';
            replacements.push(sucursalId);
        }
        query += 'ORDER BY hora_funcion';
        const resultados = await connection_1.default.query(query, {
            replacements: replacements,
            type: sequelize_1.QueryTypes.SELECT,
        });
        res.json(resultados.map((row) => row.horario));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener funciones' });
    }
});
router.get('/asientos', async (req, res) => {
    const { peliculaId, fecha, hora } = req.query;
    if (!peliculaId || !fecha || !hora) {
        return res.status(400).json({ error: 'Faltan parámetros' });
    }
    try {
        // 1. Get Function ID
        const funciones = await connection_1.default.query('SELECT id FROM funtion WHERE movie_id = ? AND fecha_funcion = ? AND hora_funcion = ?', {
            replacements: [peliculaId, fecha, hora],
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (funciones.length === 0) {
            return res.status(404).json({ error: 'Función no encontrada' });
        }
        const funtionId = funciones[0].id;
        // 2. Get Occupied Seats
        const asientos = await connection_1.default.query('SELECT seat_code FROM seat_occupied WHERE funtion_id = ?', {
            replacements: [funtionId],
            type: sequelize_1.QueryTypes.SELECT,
        });
        // Return array of seat codes (e.g. ["0-0", "1-2"])
        res.json(asientos.map((row) => row.seat_code));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener asientos' });
    }
});
// BUSCAR ID DE FUNCION
router.get('/buscar', async (req, res) => {
    const { peliculaId, fecha, hora } = req.query;
    try {
        const query = 'SELECT id FROM funtion WHERE movie_id = ? AND fecha_funcion = ? AND hora_funcion = ?';
        const resultados = await connection_1.default.query(query, {
            replacements: [peliculaId, fecha, hora],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (resultados.length > 0) {
            res.json({ id_funcion: resultados[0].id });
        }
        else {
            res.status(404).json({ error: 'Función no encontrada' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar función' });
    }
});
router.get('/test', (req, res) => {
    res.json({ msg: 'Funciona el router de funciones!' });
});
// CRUD ROUTES
router.get('/all', async (req, res) => {
    try {
        const funciones = await funcion_1.default.findAll();
        res.json(funciones);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener funciones' });
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const funcion = await funcion_1.default.findByPk(id);
        if (funcion) {
            res.json(funcion);
        }
        else {
            res.status(404).json({ msg: `No existe función con id ${id}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener función' });
    }
});
router.post('/', async (req, res) => {
    const { body } = req;
    try {
        await funcion_1.default.create(body);
        res.json({ msg: 'Función agregada con éxito!' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear función' });
    }
});
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const funcion = await funcion_1.default.findByPk(id);
        if (funcion) {
            await funcion.update(body);
            res.json({ msg: 'Función actualizada con éxito' });
        }
        else {
            res.status(404).json({ msg: `No existe función con id ${id}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar función' });
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const funcion = await funcion_1.default.findByPk(id);
        if (!funcion) {
            res.status(404).json({ msg: `No existe función con id ${id}` });
        }
        else {
            await funcion.destroy();
            res.json({ msg: 'Función eliminada con éxito!' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar función' });
    }
});
exports.default = router;
//# sourceMappingURL=funciones.routes.js.map