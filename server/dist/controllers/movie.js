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
const multer = require('multer');
const path = require('path');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = exports.saveMovie = exports.deleteMovie = exports.getMovie = exports.getMovies = void 0;
const movie_1 = require('../models/movie');
const { request } = require('https');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
    },
  });
  
  const upload = multer({ storage });

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
    
    const film = {
        _id_movie: film_id._id_movie,
        title: film_id.title,
        description: film_id.description,
        genre: film_id.genre,
        format: film_id.format,
        clasification: film_id.clasification,
        durationMin: film_id.durationMin,
        imageUri: `http://localhost:3000/${film_id.imageUri}`
    };
        res.json(film);
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
   /* => __awaiter(void 0, void 0, void 0, function* () {
    const { id_movie } = req.params;
    const film = yield movie_1.default.findByPk(id_movie);
    if (!film) {
        res.status(404).json({
            msg: `Error al eliminar la pelicula ${id_movie}`
        });
    }
    else {
        yield movie_1.default.destroy();
        res.json({
            msg: `La pelicula fue eliminada`
        });
    }
});*/
exports.deleteMovie = deleteMovie;

const saveMovie =  upload.single('imageUri') = async (req, res) => {
    // const imagePath = req.file.path;
    //  Movie.ImageUri = imagePath; se pone en la pantalla de inicio cuando muestro las peliculas en la cartelera
    const {  newtitle, newgenre, newformat, newdescription, newclasification, newdurationMin } = req;
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se ha adjuntado una imagen' });
          }
       
        const imageFileName = req.file.filename; // Nombre de la imagen
        const newimage = 'public/images' + imageFileName; // Ruta de la imagen
        const newMovie = new Movie({ newtitle, newgenre, newformat, newdescription, newclasification, newdurationMin, newimage });  
       // await newMovie.save();
        await movie_1.default.create(newMovie);
        res.json({
            msg: 'La pelicula fue agregada correctamente'
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            msg: 'Error al cargar la pelicula'
        });
    }
};
exports.saveMovie = saveMovie;

/*router.post('/createNewProduct', upload.single('image'), async (req, res) => {
  const { desc, stock, price, cat, supplier } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha adjuntado una imagen' });
  }
  
  const imageFileName = req.file.filename; // Nombre del archivo en el servidor
  const image = 'uploadsProductsImages/' + imageFileName; // Ruta relativa de la imagen

  const newProduct = new Product({ desc, stock, price, cat, supplier,  image });
  const token = jwt.sign({ _id: newProduct._id }, 'secretKey');
  await newProduct.save();
  res.status(200).json({ token });
});
*/
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
