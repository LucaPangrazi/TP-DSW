"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = exports.saveMovie = exports.deleteMovie = exports.getMovie = exports.getMovies = void 0;
const movie_1 = __importDefault(require("../models/movie"));
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listMovies = yield movie_1.default.findAll();
    res.json(listMovies);
});
exports.getMovies = getMovies;
const getMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_movie = req.params.id;
    const film = yield movie_1.default.findByPk(id_movie);
    if (film) {
        res.json(film);
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
        });
    }
});
exports.getMovie = getMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_movie = parseInt(req.params.id);
    const film = yield movie_1.default.findByPk(id_movie);
    if (!film) {
        res.status(404).json({
            msg: `Error al eliminar la pelicula ${id_movie}`
        });
    }
    else {
        yield film.destroy();
        res.json({
            msg: `La pelicula fue eliminada`
        });
    }
});
exports.deleteMovie = deleteMovie;
const saveMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, genre, format, description, clasification, durationMin } = req.body;
    const imageFileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const image = '/uploads/' + imageFileName;
    try {
        const newMovie = yield movie_1.default.create({
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
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Error al cargar la pelicula'
        });
    }
});
exports.saveMovie = saveMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const id_movie = parseInt(req.params.id);
    try {
        const film = yield movie_1.default.findByPk(id_movie);
        if (film) {
            yield film.update(body);
            res.json({
                msg: `La pelicula fue actualizada`
            });
        }
        else {
            res.status(404).json({
                msg: `Error al actualizar la pelicula ${id_movie}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Hubo un error al actualizar la pelicula'
        });
    }
});
exports.updateMovie = updateMovie;
