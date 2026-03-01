"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const funcion_1 = __importDefault(require("../models/funcion"));
const movie_1 = __importDefault(require("../models/movie"));
const sala_1 = __importDefault(require("../models/sala"));
const sucursal_1 = __importDefault(require("../models/sucursal"));
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
        // 1. Obtener el ID de la función
        const funciones = await connection_1.default.query('SELECT id FROM funtion WHERE movie_id = ? AND fecha_funcion = ? AND hora_funcion = ?', {
            replacements: [peliculaId, fecha, hora],
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (funciones.length === 0) {
            return res.status(404).json({ error: 'Función no encontrada' });
        }
        const funtionId = funciones[0].id;
        // 2. Obtener los asientos ocupados
        const asientos = await connection_1.default.query('SELECT seat_code FROM seat_occupied WHERE funtion_id = ?', {
            replacements: [funtionId],
            type: sequelize_1.QueryTypes.SELECT,
        });
        // Devuelve array del codigo de los asientos (ej. ["0-0", "1-2"])
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
// CRUD RUTAS
router.get('/all', async (req, res) => {
    try {
        const funciones = await funcion_1.default.findAll({
            include: [
                { model: movie_1.default, attributes: ['title'] },
                { model: sala_1.default, attributes: ['name'] },
                { model: sucursal_1.default, attributes: ['nombre'] }
            ]
        });
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
// GUARDAR ASIENTOS OCUPADOS
router.post('/guardar-asientos', async (req, res) => {
    const { funtion_id, seat_codes } = req.body;
    console.log('Guardar asientos called with:', { funtion_id, seat_codes });
    // Validar datos
    if (!funtion_id || !seat_codes || !Array.isArray(seat_codes) || seat_codes.length === 0) {
        return res.status(400).json({
            msg: 'Datos inválidos',
            error: 'INVALID_DATA',
            details: 'Se requiere funtion_id y seat_codes (array no vacío)'
        });
    }
    try {
        // 1. Verificar que la función existe
        const funcion = await funcion_1.default.findByPk(funtion_id);
        if (!funcion) {
            return res.status(404).json({
                msg: 'Función no encontrada',
                error: 'FUNCTION_NOT_FOUND',
                funtion_id
            });
        }
        console.log('Function found:', funtion_id);
        // 2. Validar formato de seat_codes y verificar que no existan
        for (const seat_code of seat_codes) {
            // Validar formato "row-col"
            if (!/^\d+-\d+$/.test(seat_code)) {
                return res.status(400).json({
                    msg: 'Formato de asiento inválido',
                    error: 'INVALID_SEAT_FORMAT',
                    details: `El asiento debe tener formato "fila-columna" (ej: "1-5"), recibido: ${seat_code}`
                });
            }
            // Verificar que el asiento no esté ya ocupado
            const existingRecord = await connection_1.default.query('SELECT id FROM seat_occupied WHERE funtion_id = ? AND seat_code = ?', {
                replacements: [funtion_id, seat_code],
                type: sequelize_1.QueryTypes.SELECT
            });
            if (existingRecord.length > 0) {
                return res.status(409).json({
                    msg: 'Asiento ya está ocupado',
                    error: 'SEAT_ALREADY_OCCUPIED',
                    seat_code,
                    funtion_id
                });
            }
        }
        console.log('All seat validations passed, inserting', seat_codes.length, 'seats');
        // 3. Insertar todos los asientos
        const insertQuery = 'INSERT INTO seat_occupied (funtion_id, seat_code) VALUES (?, ?)';
        for (const seat_code of seat_codes) {
            await connection_1.default.query(insertQuery, {
                replacements: [funtion_id, seat_code],
                type: sequelize_1.QueryTypes.INSERT
            });
        }
        console.log('Seats saved successfully');
        res.json({
            msg: 'Asientos guardados con éxito',
            funtion_id,
            seats_saved: seat_codes.length,
            seat_codes
        });
    }
    catch (error) {
        console.error('Error saving seats:', error);
        res.status(500).json({
            msg: 'Error al guardar asientos',
            error: error?.message || 'Unknown error',
            details: error?.toString?.() || 'No details'
        });
    }
});
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    console.log(`Updating function ${id} with data:`, body);
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