import { Router, Request, Response } from 'express';
import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';
import Funcion from '../models/funcion';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const { peliculaId, fecha, sucursalId } = req.query;

  if (!peliculaId || !fecha) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  try {
    let query = 'SELECT hora_funcion as horario FROM funtion WHERE movie_id = ? AND fecha_funcion = ? ';
    const replacements: any[] = [peliculaId, fecha];

    if (sucursalId) {
      query += 'AND sucursal_id = ? ';
      replacements.push(sucursalId);
    }

    query += 'ORDER BY hora_funcion';

    const resultados: any[] = await sequelize.query(
      query,
      {
        replacements: replacements,
        type: QueryTypes.SELECT,
      }
    );

    res.json(resultados.map((row: any) => row.horario));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener funciones' });
  }
});


router.get('/asientos', async (req: Request, res: Response) => {
  const { peliculaId, fecha, hora } = req.query;

  if (!peliculaId || !fecha || !hora) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  try {
    // 1. Get Function ID
    const funciones: any[] = await sequelize.query(
      'SELECT id FROM funtion WHERE movie_id = ? AND fecha_funcion = ? AND hora_funcion = ?',
      {
        replacements: [peliculaId, fecha, hora],
        type: QueryTypes.SELECT,
      }
    );

    if (funciones.length === 0) {
      return res.status(404).json({ error: 'Función no encontrada' });
    }

    const funtionId = funciones[0].id;

    // 2. Get Occupied Seats
    const asientos: any[] = await sequelize.query(
      'SELECT seat_code FROM seat_occupied WHERE funtion_id = ?',
      {
        replacements: [funtionId],
        type: QueryTypes.SELECT,
      }
    );

    // Return array of seat codes (e.g. ["0-0", "1-2"])
    res.json(asientos.map((row: any) => row.seat_code));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener asientos' });
  }
});

// BUSCAR ID DE FUNCION
router.get('/buscar', async (req: Request, res: Response) => {
  const { peliculaId, fecha, hora } = req.query;

  try {
    const query = 'SELECT id FROM funtion WHERE movie_id = ? AND fecha_funcion = ? AND hora_funcion = ?';
    const resultados: any[] = await sequelize.query(
      query,
      {
        replacements: [peliculaId, fecha, hora],
        type: QueryTypes.SELECT
      }
    );

    if (resultados.length > 0) {
      res.json({ id_funcion: resultados[0].id });
    } else {
      res.status(404).json({ error: 'Función no encontrada' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar función' });
  }
});

router.get('/test', (req: Request, res: Response) => {
  res.json({ msg: 'Funciona el router de funciones!' });
});


// CRUD ROUTES
router.get('/all', async (req: Request, res: Response) => {
  try {
    const funciones = await Funcion.findAll();
    res.json(funciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener funciones' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const funcion = await Funcion.findByPk(id);
    if (funcion) {
      res.json(funcion);
    } else {
      res.status(404).json({ msg: `No existe función con id ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener función' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { body } = req;
  try {
    await Funcion.create(body);
    res.json({ msg: 'Función agregada con éxito!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear función' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const funcion = await Funcion.findByPk(id);
    if (funcion) {
      await funcion.update(body);
      res.json({ msg: 'Función actualizada con éxito' });
    } else {
      res.status(404).json({ msg: `No existe función con id ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar función' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const funcion = await Funcion.findByPk(id);
    if (!funcion) {
      res.status(404).json({ msg: `No existe función con id ${id}` });
    } else {
      await funcion.destroy();
      res.json({ msg: 'Función eliminada con éxito!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar función' });
  }
});

export default router;
