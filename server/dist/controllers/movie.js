const MovieModel = require('../models/movie');
const { getMovies: getMoviesService, getMovie: getMovieService } = require('../services/movie.service');

module.exports.getMovies = async (req, res) => {
  const listMovies = await MovieModel.findAll();
  res.json(listMovies);
};

module.exports.getMovie = async (req, res) => {
  const id = req.params.id;
  const film_id = await MovieModel.findByPk(id);
  if (!film_id) {
    res.status(404).json({
      msg: `No existe una pelicula con el id ${id}`
    });
  }
  res.json(film_id);
};

module.exports.deleteMovie = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const film_id = await MovieModel.findByPk(id);
    if (!film_id) {
      return res.status(404).json({
        msg: `Error al eliminar la pelicula ${id}`
      });
    }
    // Agregar lógica para eliminar la imagen de Cloudinary si es necesario
    await MovieModel.destroy({
      where: { id_movie: id }
    }).then(() => {
      return res.status(200).json({ message: 'Pelicula eliminada' });
    });
  } catch (error) {
    return res.json({
      msg: `UPS! HUBO UN ERROR`
    });
  }
};

module.exports.saveMovie = async (req, res) => {
  const { newtitle, newgenre, newformat, newdescription, newclasification, newdurationMin } = req.body;

  if (!req.files || !req.files.imageUri) {
    return res.status(400).json({ error: 'No se ha adjuntado una imagen' });
  }

  try {
    const imageFileName = req.files.imageUri.name;
    const newimage = 'uploads/' + imageFileName;

    const newMovie = new MovieModel({
      newtitle,
      newgenre,
      newformat,
      newdescription,
      newclasification,
      newdurationMin,
      newimage
    });

    await newMovie.save();
    await fs.unlink(req.files.imageUri.tempFilePath);

    res.json({
      msg: 'La pelicula fue agregada correctamente',
      newMovie
    });
  } catch (error) {
    if (req.files?.imageUri) {
      await fs.unlink(req.files.imageUri.tempFilePath);
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports.updateMovie = async (req, res) => {
  try {
    const { body } = req;
    const id = parseInt(req.params.id);
    const film_id = await MovieModel.findByPk(id);
    if (!film_id) {
      return res.status(404).json({
        msg: `Error al actualizar la pelicula ${id}`
      });
    }
    await film_id.update(body);
  } catch (error) {
    console.log(error);
    res.json({
      msg: 'Hubo un error al actualizar la pelicula'
    });
  }
};
