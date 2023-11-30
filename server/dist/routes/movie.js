"use strict";
const { Router } = require("express");
const { getMovies, getMovie, deleteMovie, saveMovie, updateMovie } = require("../controllers/movie");
const fileUpload = require('express-fileupload');
const router = Router();

router.get('/movies', getMovies);
router.get('/movies/:id', getMovie);
router.delete('/movies/:id', deleteMovie);

router.post('/movies', fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
}), saveMovie);

router.put('/movies/:id', updateMovie);

module.exports = router;
