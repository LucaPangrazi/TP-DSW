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
const Movie = require('../models/movie');
const {uploadImage, deleteImage} = require('../utils/cloudinary.js');
//const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const config = require('../utils/cloudinary.js');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = exports.saveMovie = exports.deleteMovie = exports.getMovie = exports.getMovies = void 0;
const movie_1 = require('../models/movie');
const { request } = require('https');
const fs = require('fs-extra');
//const upload = multer();
 /* const saveImage = (req, res) =>*/
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listMovies = yield movie_1.default.findAll();
    res.json(listMovies);
});
exports.getMovies = getMovies;
const getMovie = async (req, res) => 
{
    const  id  = req.params.id;
    const film_id = await movie_1.default.findByPk(id);
    if (!film_id) {
        res.status(404).json({
            msg: `No existe una pelicula con el id ${id}`
        });
    }
    /*
    const film = {
        id_movie: film_id._id_movie,
        title: film_id.title,
        description: film_id.description,
        genre: film_id.genre,
        format: film_id.format,
        clasification: film_id.clasification,
        durationMin: film_id.durationMin,
        imageUri: `http://localhost:3000/${film_id.imageUri}`
    };*/
        res.json(film_id);
};
exports.getMovie = getMovie;

const deleteMovie = async (req, res) => {
    try {
        const  id  = parseInt(req.params.id);
        const film_id = await movie_1.default.findByPk(id);
        if (!film_id) {
            return res.status(404).json({
                msg: `Error al eliminar la pelicula ${id}`
            });
        }
        await deleteImage(film_id.imageUri.public_id);
       // await deleteImage(film_id.imageUri)
        await movie_1.default.destroy({
            where:{id_movie: id}
        }).then(() =>{return res.status(200).json({message: 'Pelicula eliminada'})});
    } 
    catch (error) {
        return res.json({
            msg: `UPS! HUBO UN ERROR`
        });
    }
  };
exports.deleteMovie = deleteMovie;

cloudinary.config(cloudinary.cloudinary);
const saveMovie = async (req, res) => {
    // const imagePath = req.file.path;
    //  Movie.ImageUri = imagePath; se pone en la pantalla de inicio cuando muestro las peliculas en la cartelera
   
    const {  newtitle, newgenre, newformat, newdescription, newclasification, newdurationMin } = req.body;
    console.log(req.files);
    if (!req.files || !req.files.imageUri) {
        return res.status(400).json({ error: 'No se ha adjuntado una imagen' });
      }
    try {
        //const newMovie = new Movie({ newtitle, newgenre, newformat, newdescription, newclasification, newdurationMin });
            //if (req.file?.imageUri){
        if (req.file){
      // const rta = await uploadImage(req.files.imageUri.tempFilePath);
      // const newimage = rta.public_id;
      const imageFileName = req.files.imageUri.name ; 
      const newimage =  'uploads/' + imageFileName ; // Ruta de la imagen
      const newMovie = new Movie({ newtitle, newgenre, newformat, newdescription, newclasification, newdurationMin, newimage });
      /*  newMovie.imageUri= {
                public_id: rta.public_id,
                secure_url: rta.secure_url
            }*/
           await fs.unlink(req.files.imageUri.tempFilePath);
      // }
       const savedMovie = await movie_1.default.create(newMovie); 
        //const savedMovie = await newMovie.save();
        //res.json(savedMovie);
       // await movie_1.default.create(newMovie);
       
      // const newMovie = new Movie({ newtitle, newgenre, newformat, newdescription, newclasification, newdurationMin, newimage }); 
      /*   const imageFileName = req.file.filename; // Nombre de la imagen
       const newimage = 'public/images' + imageFileName; // Ruta de la imagen
       const newMovie = new Movie({ newtitle, newgenre, newformat, newdescription, newclasification, newdurationMin, newimage });  
      */
        res.json({
            msg: 'La pelicula fue agregada correctamente',
           savedMovie
        });
      }
    }
      catch (error) {
        if (req.files?.imageUri) {
          await fs.unlink(req.files.imageUri.tempFilePath)
        }
        return res.status(500).json({ message: error.message });
      }
};
exports.saveMovie = saveMovie;

const updateMovie = async (req, res) => {
    try {
        const { body } = req;
        const  id  = parseInt(req.params.id);
        const film_id = await movie_1.default.findByPk(id);
        if (!film_id) {
            return res.status(404).json({
                msg: `Error al actualizar la pelicula ${id}`
            });
        }
        await film_id.update(body);
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Hubo un error al actualizar la pelicula'
        });
    }
};
exports.updateMovie = updateMovie;
