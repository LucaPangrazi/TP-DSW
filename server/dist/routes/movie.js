"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const {
    getMovies,
    getMovie,
    deleteMovie,
    saveMovie,
    updateMovie
  } = require("../controllers/movie.js");
const express_1 = require("express");
const fileUpload = require('express-fileupload');
//const movie_1 = require("../controllers/movie");
//const multer = require('multer');
//const path = require('path');
const router = (0, express_1.Router)();
/*
const upload = multer({
    dest: path.join(__dirname, '../uploads'),
    fileFilter: function (req, file, cb) {
        var filetypes = /jpeg|jpg|png|gif/;
        var mimetype = filetypes.test(file.mimetype);
        if (mimetype) {
            return cb(null, true);
        }
        cb("Error: Solo se admite los siguientes tipos de archivos - " + filetypes);
    },
    limits: { fileSize: 2000000 }
}).single('imageUri');*/
/*
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ruta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Usa el nombre original del archivo
    }
});
const upload = multer({ storage });
module.exports = upload;*/
router.get('/', getMovies);
router.get('/:id', getMovie);
router.delete('/:id', deleteMovie);

router.post('/', fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
}), saveMovie);
//router.post('/', upload.single('imageUri'), saveMovie);
router.put('/:id', updateMovie);
exports.default = router;
