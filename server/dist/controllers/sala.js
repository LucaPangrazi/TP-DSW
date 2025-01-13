import Sala from '../models/sala';
export const getSalas = async (req, res) => {
    try {
        const listSalas = await Sala.findAll();
        res.json(listSalas);
    }
    catch (error) {
        console.error('Error al obtener salas:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};
export const getSala = async (req, res) => {
    const { id } = req.params;
    const hall = await Sala.findByPk(id);
    if (hall) {
        res.json(hall);
    }
    else {
        res.status(404).json({
            msg: `No existe una sala con el id ${id}`
        });
    }
};
export const deleteSala = async (req, res) => {
    const { id } = req.params;
    const sala = await Sala.findByPk(id);
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
export const postSala = async (req, res) => {
    const { body } = req;
    try {
        await Sala.create(body);
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
export const updateSala = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const sala = await Sala.findByPk(id);
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
//# sourceMappingURL=sala.js.map