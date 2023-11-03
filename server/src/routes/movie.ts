import { Router } from "express";
import { deleteMovie, getMovie, getMovies, saveMovie, updateMovie } from '../controllers/movie';
const multer = require('multer');
const path = require('path');

const router = Router();
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
        limits: {fileSize: 2000000}
    }).single('image')

router.get('/', getMovies);
router.get('/:id', getMovie);
router.delete('/:id', deleteMovie);
router.post('/', upload, saveMovie);
router.put('/:id', updateMovie);

export default router;