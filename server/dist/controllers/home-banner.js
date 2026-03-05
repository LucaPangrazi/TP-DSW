"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBanner = exports.getBanner = void 0;
const home_banner_1 = __importDefault(require("../models/home-banner"));
const movie_1 = __importDefault(require("../models/movie"));
const fs_1 = __importDefault(require("fs"));
// Obtener banner actual
const getBanner = async (req, res) => {
    try {
        const banner = await home_banner_1.default.findOne({
            where: { active: true },
            order: [['id', 'DESC']]
        });
        if (banner) {
            // Encontrar id de la película para asegurar que exista y obtener el título
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
// Crear o actualizar banner
const updateBanner = async (req, res) => {
    const { movie_id } = req.body;
    const file = req.file;
    console.log('updateBanner called with:', { movie_id, file: file ? { filename: file.filename, size: file.size } : 'NO_FILE' });
    try {
        // Validar que tanto movie_id como el archivo estén presentes
        if (!movie_id) {
            console.error('No llego movie_id');
            if (file) {
                try {
                    fs_1.default.unlinkSync(file.path);
                }
                catch (e) {
                    console.error('Error al eliminar archivo por fallo en la validación de movie_id:', e);
                }
            }
            return res.status(400).json({ msg: 'ID de película es requerido', error: 'MISSING_MOVIE_ID' });
        }
        if (!file) {
            console.error('No file provided');
            return res.status(400).json({ msg: 'Imagen del banner es requerida', error: 'MISSING_FILE' });
        }
        console.log('Valido movie_id:', movie_id);
        // Validar que exista la pelicula
        const movie = await movie_1.default.findByPk(movie_id);
        if (!movie) {
            console.error('Película no encontrada:', movie_id);
            // Limpiar archivo subido si la pelicula es invalida
            try {
                fs_1.default.unlinkSync(file.path);
            }
            catch (e) {
                console.error('Error al eliminar archivo por fallo en la validación de la película:', e);
            }
            return res.status(404).json({ msg: 'Película no encontrada', error: 'MOVIE_NOT_FOUND', movieId: movie_id });
        }
        // Validar que el archivo se subio correctamente
        if (!file.filename || !file.path) {
            console.error('Fallo en la validación del archivo:', { filename: file.filename, path: file.path });
            return res.status(400).json({ msg: 'Error al procesar la imagen', error: 'FILE_PROCESSING_ERROR' });
        }
        console.log('Desactivo viejos banners');
        await home_banner_1.default.update({ active: false }, { where: { active: true } });
        console.log('Creating new banner with:', { movie_id, filename: file.filename });
        // Crear nuevo banner
        const newBanner = await home_banner_1.default.create({
            movie_id: parseInt(movie_id),
            custom_image: file.filename,
            active: true
        });
        console.log('Banner bien creado:', newBanner.toJSON());
        res.json({
            msg: 'Banner actualizado con éxito',
            banner: newBanner
        });
    }
    catch (error) {
        console.error('Excepcion en updateBanner:', error);
        if (req.file) {
            try {
                fs_1.default.unlinkSync(req.file.path);
            }
            catch (e) {
                console.error('Error al eliminnar archivo:', e);
            }
        }
        res.status(500).json({
            msg: 'Error actualizando banner',
            error: error?.message || 'Error desconocido',
            details: error?.toString?.() || 'No hay detalles'
        });
    }
};
exports.updateBanner = updateBanner;
//# sourceMappingURL=home-banner.js.map