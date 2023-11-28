const SalaModel = require('../models/sala');

module.exports.getSalas = async (req, res) => {
  const listSalas = await SalaModel.findAll();
  res.json(listSalas);
};

module.exports.getSala = async (req, res) => {
  const { id } = req.params;
  const sala = await SalaModel.findByPk(id);

  if (sala) {
    res.json(sala);
  } else {
    res.status(404).json({
      msg: `No existe una sala con el id ${id}`
    });
  }
};

module.exports.deleteSala = async (req, res) => {
  const { id } = req.params;
  const sala = await SalaModel.findByPk(id);

  if (!sala) {
    res.status(404).json({
      msg: `No existe una sala con el id ${id}`
    });
  } else {
    await sala.destroy();
    res.json({
      msg: 'La sala fue eliminada con éxito!'
    });
  }
};

module.exports.postSala = async (req, res) => {
  const { body } = req;
  try {
    await SalaModel.create(body);
    res.json({
      msg: 'La sala fue agregada con éxito!'
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: 'Ups, ocurrió un error, comuníquese con soporte'
    });
  }
};

module.exports.updateSala = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const sala = await SalaModel.findByPk(id);
    if (sala) {
      await sala.update(body);
      res.json({
        msg: 'La sala fue actualizada con éxito!'
      });
    } else {
      res.status(404).json({
        msg: `No existe una sala con el id ${id}`
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: 'Ups, ocurrió un error, comuníquese con soporte'
    });
  }
};
