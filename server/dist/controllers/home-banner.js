"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBanner = exports.getBanner = void 0;
const home_banner_1 = __importDefault(require("../models/home-banner"));
const movie_1 = __importDefault(require("../models/movie"));
const fs_1 = __importDefault(require("fs"));
// Get Current Banner
const getBanner = async (req, res) => {
    try {
        const banner = await home_banner_1.default.findOne({
            where: { active: true },
            order: [['id', 'DESC']]
        });
        if (banner) {
            // Fetch movie Details to ensure it exists and get title
            const movie = await movie_1.default.findByPk(banner.getDataValue('movie_id'));
            res.json({
                banner,
                movie: movie ? movie : null
            });
        }
        else {
            res.json(null);
        }
    }
    catch (error) {
        res.status(500).json({ msg: 'Error al obtener banner', error });
    }
};
exports.getBanner = getBanner;
// Create or Update Banner
const updateBanner = async (req, res) => {
    const { movie_id } = req.body;
    const file = req.file;
    console.log('updateBanner called with:', { movie_id, file: file ? { filename: file.filename, size: file.size } : 'NO_FILE' });
    try {
        // Validate both movie_id and file are present
        if (!movie_id) {
            console.error('No movie_id provided');
            if (file) {
                try {
                    fs_1.default.unlinkSync(file.path);
                }
                catch (e) {
                    console.error('Error deleting file on movie_id validation fail:', e);
                }
            }
            return res.status(400).json({ msg: 'ID de película es requerido', error: 'MISSING_MOVIE_ID' });
        }
        if (!file) {
            console.error('No file provided');
            return res.status(400).json({ msg: 'Imagen del banner es requerida', error: 'MISSING_FILE' });
        }
        console.log('Validating movie_id:', movie_id);
        // Validate movie exists
        const movie = await movie_1.default.findByPk(movie_id);
        if (!movie) {
            console.error('Movie not found:', movie_id);
            // Clean up uploaded file if movie invalid
            try {
                fs_1.default.unlinkSync(file.path);
            }
            catch (e) {
                console.error('Error deleting file on movie validation fail:', e);
            }
            return res.status(404).json({ msg: 'Película no encontrada', error: 'MOVIE_NOT_FOUND', movieId: movie_id });
        }
        // Validate file was actually uploaded
        if (!file.filename || !file.path) {
            console.error('File validation failed:', { filename: file.filename, path: file.path });
            return res.status(400).json({ msg: 'Error al procesar la imagen', error: 'FILE_PROCESSING_ERROR' });
        }
        console.log('Deactivating old banners...');
        // Deactivate old banners
        await home_banner_1.default.update({ active: false }, { where: { active: true } });
        console.log('Creating new banner with:', { movie_id, filename: file.filename });
        // Create new banner with the custom image filename
        const newBanner = await home_banner_1.default.create({
            movie_id: parseInt(movie_id),
            custom_image: file.filename,
            active: true
        });
        console.log('Banner created successfully:', newBanner.toJSON());
        res.json({
            msg: 'Banner actualizado con éxito',
            banner: newBanner
        });
    }
    catch (error) {
        console.error('Exception in updateBanner:', error);
        if (req.file) {
            try {
                fs_1.default.unlinkSync(req.file.path);
            }
            catch (e) {
                console.error('Error deleting file on exception:', e);
            }
        }
        res.status(500).json({
            msg: 'Error actualizando banner',
            error: error?.message || 'Unknown error',
            details: error?.toString?.() || 'No details'
        });
    }
};
exports.updateBanner = updateBanner;
//# sourceMappingURL=home-banner.js.map