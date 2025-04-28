import Movie from '../models/movie';
export const getMovieById = async (req, res) => {
    const id_movie = req.params.id;
    try {
        const film = await Movie.findByPk(id_movie);
        if (film) {
            const filmDet = {
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
        }
        else {
            res.status(404).json({
                msg: `No existe una película con el id ${id_movie}`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener la película',
            error
        });
    }
};
//# sourceMappingURL=detalle-pelicula.js.map