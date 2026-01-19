"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = exports.saveMovie = exports.deleteMovie = exports.getMovie = exports.getMovies = void 0;
const movie_1 = __importDefault(require("../models/movie"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const getMovies = async (req, res) => {
    const listMovies = await movie_1.default.findAll();
    res.json(listMovies);
};
exports.getMovies = getMovies;
const getMovie = async (req, res) => {
    const id_movie = req.params.id;
    const film = await movie_1.default.findByPk(id_movie);
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
};
exports.getMovie = getMovie;
const deleteMovie = async (req, res) => {
    const id_movie = parseInt(req.params.id);
    const film = await movie_1.default.findByPk(id_movie);
    if (!film) {
        res.status(404).json({
            msg: `Error al eliminar la película ${id_movie}`
        });
    }
    else {
        await film.destroy();
        const imageName = film.get('image') + '';
        const uploadsPath = path_1.default.join(__dirname, '..', '..', 'uploads');
        const imagePath = path_1.default.join(uploadsPath, imageName);
        try {
            const filesBeforeDelete = fs_1.default.readdirSync(uploadsPath);
            console.log('Archivos antes de la eliminación:', filesBeforeDelete);
            if (fs_1.default.existsSync(imagePath)) {
                await fs_extra_1.default.remove(imagePath);
                console.log(`La imagen ${imageName} fue eliminada correctamente.`);
            }
            else {
                console.log(`La imagen ${imageName} no existe en el sistema de archivos.`);
            }
        }
        catch (error) {
            console.error(`Error al eliminar la película ${id_movie}:`, error);
            res.status(500).json({
                msg: 'Error interno del servidor al eliminar la película'
            });
        }
    }
};
exports.deleteMovie = deleteMovie;
const saveMovie = async (req, res) => {
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
        const newMovie = await movie_1.default.create({
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
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Error al cargar la película'
        });
    }
};
exports.saveMovie = saveMovie;
const updateMovie = async (req, res) => {
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
        const film = await movie_1.default.findByPk(id_movie);
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
        }
        else {
            res.status(404).json({
                msg: `Error al actualizar la película ${id_movie}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Hubo un error al actualizar la película'
        });
    }
};
exports.updateMovie = updateMovie;
//# sourceMappingURL=movie.js.map