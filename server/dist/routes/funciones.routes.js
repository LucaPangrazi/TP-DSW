import { Router } from 'express';
import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';
const router = Router();
router.get('/', async (req, res) => {
    const { peliculaId, fecha } = req.query;
    if (!peliculaId || !fecha) {
        return res.status(400).json({ error: 'Faltan parámetros' });
    }
    try {
        const resultados = await sequelize.query('SELECT horario FROM funciones WHERE id_pelicula = ? AND fecha = ? ORDER BY horario', {
            replacements: [peliculaId, fecha],
            type: QueryTypes.SELECT,
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
export default router;
//# sourceMappingURL=funciones.routes.js.map