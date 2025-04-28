import { Router, Request, Response } from 'express';
import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const { peliculaId, fecha } = req.query;

  if (!peliculaId || !fecha) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  try {
    const resultados: any[] = await sequelize.query(
      'SELECT horario FROM funciones WHERE id_pelicula = ? AND fecha = ? ORDER BY horario',
      {
        replacements: [peliculaId, fecha],
        type: QueryTypes.SELECT,
      }
    );

    res.json(resultados.map((row: any) => row.horario));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener funciones' });
  }
});

router.get('/test', (req: Request, res: Response) => {
  res.json({ msg: 'Funciona el router de funciones!' });
});


export default router;
