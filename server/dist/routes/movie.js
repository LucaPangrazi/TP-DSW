"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_1 = require("../controllers/movie");
const multer = require('multer');
const path = require('path');
const router = (0, express_1.Router)();
const upload = multer({
    dest: path.join(__dirname, '../public/images'),
    /*    function (req, file, cb) {
                var filetypes = /jpeg|jpg|png|gif/;
                var mimetype = filetypes.test(file.mimetype);
                if (mimetype) {
                    return cb(null, true);
                 }
            cb("Error: Solo se admite los siguientes tipos de archivos - " + filetypes);
            }, */
    limits: { fileSize: 2000000 }
}).single('image');
router.get('/', movie_1.getMovies);
router.get('/:id', movie_1.getMovie);
router.delete('/:id', movie_1.deleteMovie);
router.post('/', upload, movie_1.saveMovie);
router.put('/:id', movie_1.updateMovie);
exports.default = router;
