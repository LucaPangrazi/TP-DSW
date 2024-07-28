import { Request, Response } from 'express';
import Movie from '../models/movie';
import { MovieAttributes } from '../interfaces/movie-attributes'; 
import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';

export const getMovies = async (req: Request, res: Response) => {
  const listMovies = await Movie.findAll();
  res.json(listMovies);
}

export const getMovie = async (req: Request, res: Response) => {
  const id_movie = req.params.id;
  const film = await Movie.findByPk(id_movie);
  if (film) {
    const filmDet: MovieAttributes = {
      id_movie: film.id_movie,
      title: film.title,
      genre: film.genre,
      format: film.format,
      description: film.description,
      clasification: film.clasification,
      durationMin: film.durationMin,
      image: `http://localhost:3000/uploads/${film.image}` 
    };
    res.json(filmDet);
  } else {
    res.status(404).json({
      msg: `No existe una película con el id ${id_movie}`
    });
  }
}

export const deleteMovie = async (req: Request, res: Response) => {
  const id_movie = parseInt(req.params.id);
  const film = await Movie.findByPk(id_movie);
  if (!film) {
    res.status(404).json({
      msg: `Error al eliminar la película ${id_movie}`
    });
  } else {
    await film.destroy();
    const imageName = film.get('image') + '';
    const uploadsPath = path.join(__dirname, '..', '..', 'uploads');
    const imagePath = path.join(uploadsPath, imageName);
    try {
      const filesBeforeDelete = fs.readdirSync(uploadsPath);
      console.log('Archivos antes de la eliminación:', filesBeforeDelete);

      if (fs.existsSync(imagePath)) {
        await fsExtra.remove(imagePath);
        console.log(`La imagen ${imageName} fue eliminada correctamente.`);
      } else {
        console.log(`La imagen ${imageName} no existe en el sistema de archivos.`);
      }
    } catch (error) {
      console.error(`Error al eliminar la película ${id_movie}:`, error);
      res.status(500).json({
        msg: 'Error interno del servidor al eliminar la película'
      });
    }
  }
}

export const saveMovie = async (req: Request<{}, {}, MovieAttributes>, res: Response) => {
  const { title, genre, format, description, clasification, durationMin } = req.body;
  const imageFileName = req.file?.filename;
  console.log('imageFileName:', imageFileName);
  if (!imageFileName) {
    return res.status(400).json({
      msg: 'No se ha adjuntado una imagen'
    });
  }
  const image = imageFileName;
  try {
    const newMovie = await Movie.create({
      title,
      genre,
      format,
      description,
      clasification,
      durationMin,
      image,
    });
    res.json({
      msg: 'La película fue agregada correctamente',
      data: newMovie,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: 'Error al cargar la película'
    });
  }
}

export const updateMovie = async (req: Request, res: Response) => {
  const imageFileName = req.file?.filename;
  console.log('imageFileName:', imageFileName);
  const { title, genre, format, description, clasification, durationMin } = req.body;
  const id_movie = parseInt(req.params.id);
  console.log('imageFileName:', imageFileName);
  if (!imageFileName) {
    return res.status(400).json({
      msg: 'No se ha adjuntado una imagen'
    });
  }
  const image = imageFileName;
  try {
    const film = await Movie.findByPk(id_movie);
    if (film) {
      const updatedMovie = await film.update({
        title,
        genre,
        format,
        description,
        clasification,
        durationMin,
        image,
      });
      res.json({
        msg: 'La película fue actualizada',
        data: updatedMovie,
      });
    } else {
      res.status(404).json({
        msg: `Error al actualizar la película ${id_movie}`
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: 'Hubo un error al actualizar la película'
    });
  }
}
