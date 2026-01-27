
import { Router } from 'express';
import { getBanner, updateBanner } from '../controllers/home-banner';
import upload from '../libs/storage';

const router = Router();

router.get('/', getBanner);
router.post('/', upload.single('image'), updateBanner);

export default router;
