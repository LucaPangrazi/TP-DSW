import { Request, Response } from "express";
import Movie from '../models/movie';

interface MovieRequestBody {
    title: string;
    genre: string;
    format: string;
    description: string;
    clasification: string;
    durationMin: number;
    image: string
  }

export const getMovies = async (req: Request, res: Response) => {
        const listMovies = await Movie.findAll()
    res.json(listMovies)
}

export const getMovie = async (req: Request, res: Response) => {
    const id_movie = req.params.id;
    const film = await Movie.findByPk(id_movie);
    if(film){
        res.json(film)
    }
    /*if(film){
        const filmDet = {
            id_movie: film.id_movie,
            title:  film.title,
            genre: film.genre,
            format: film.format,
            description: film.description,
            clasification: film.clasification,
            durationMin: film.durationMin,
            image: `http://localhost:3000/${film.image}`
        };
        res.json(filmDet)
    }*/
    else {
        res.status(404).json({
            msg: `No existe una pelicula con el id ${id_movie}`
        })
    }    
}

export const deleteMovie = async (req: Request, res: Response) => {
    const id_movie = parseInt(req.params.id);
    const film = await Movie.findByPk(id_movie);
    if(!film){
        res.status(404).json({
            msg: `Error al eliminar la pelicula ${id_movie}`
        })
    }
    else {
        await film.destroy();
        res.json({
            msg: `La pelicula fue eliminada`
        })
    }
}

export const saveMovie = async (req: Request<{}, {}, MovieRequestBody>, res: Response) => {
    const { title, genre, format, description, clasification, durationMin } = req.body;
    const imageFileName = req.file?.filename;
    const image = '/uploads/' + imageFileName;
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
            msg: 'La pelicula fue agregada correctamente',
            data: newMovie,
        }) 
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Error al cargar la pelicula'
        }) 
    }    
}

export const updateMovie = async (req: Request, res: Response) => {
    const { body } = req;
    const id_movie = parseInt(req.params.id);
    try {
        const film = await Movie.findByPk(id_movie);
        if(film){
            await film.update(body);
            res.json({
                msg: `La pelicula fue actualizada`
            })        
        }
        else {
            res.status(404).json({
                msg: `Error al actualizar la pelicula ${id_movie}`
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Hubo un error al actualizar la pelicula'
        }) 
    }    
}