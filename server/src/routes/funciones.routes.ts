import { Router, Request, Response } from 'express';
import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';
import Funcion from '../models/funcion';
import Movie from '../models/movie';
import Sala from '../models/sala';
import Sucursal from '../models/sucursal';

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
    // 1. Obtener el ID de la función
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

    // 2. Obtener los asientos ocupados
    const asientos: any[] = await sequelize.query(
      'SELECT seat_code FROM seat_occupied WHERE funtion_id = ?',
      {
        replacements: [funtionId],
        type: QueryTypes.SELECT,
      }
    );

    // Devuelve array del codigo de los asientos (ej. ["0-0", "1-2"])
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


// CRUD RUTAS
router.get('/all', async (req: Request, res: Response) => {
  try {
    const funciones = await Funcion.findAll({
      include: [
        { model: Movie, attributes: ['title'] },
        { model: Sala, attributes: ['name'] },
        { model: Sucursal, attributes: ['nombre'] }
      ]
    });
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

// GUARDAR ASIENTOS OCUPADOS
router.post('/guardar-asientos', async (req: Request, res: Response) => {
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
    const funcion = await Funcion.findByPk(funtion_id);
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
      const existingRecord: any = await sequelize.query(
        'SELECT id FROM seat_occupied WHERE funtion_id = ? AND seat_code = ?',
        {
          replacements: [funtion_id, seat_code],
          type: QueryTypes.SELECT
        }
      );

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
      await sequelize.query(
        insertQuery,
        {
          replacements: [funtion_id, seat_code],
          type: QueryTypes.INSERT
        }
      );
    }

    console.log('Seats saved successfully');

    res.json({
      msg: 'Asientos guardados con éxito',
      funtion_id,
      seats_saved: seat_codes.length,
      seat_codes
    });

  } catch (error: any) {
    console.error('Error saving seats:', error);
    res.status(500).json({
      msg: 'Error al guardar asientos',
      error: error?.message || 'Unknown error',
      details: error?.toString?.() || 'No details'
    });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating function ${id} with data:`, body);
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
