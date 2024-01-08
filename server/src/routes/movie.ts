import { Router, Request, Response } from 'express';
import { deleteMovie, getMovie, getMovies, saveMovie, updateMovie } from '../controllers/movie';
import multer, { diskStorage } from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage });

const router = Router();
router.get('/', getMovies);
router.get('/:id', getMovie);
router.delete('/:id', deleteMovie);
router.post('/', upload.single('image'), saveMovie);
router.put('/:id', updateMovie);

export default router;