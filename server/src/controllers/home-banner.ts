
import { Request, Response } from 'express';
import HomeBanner from '../models/home-banner';
import Movie from '../models/movie';
import fs from 'fs';
import path from 'path';

// Get Current Banner
export const getBanner = async (req: Request, res: Response) => {
    try {
        const banner = await HomeBanner.findOne({
            where: { active: true },
            order: [['id', 'DESC']]
        });

        if (banner) {
            // Fetch movie Details to ensure it exists and get title
            const movie = await Movie.findByPk(banner.getDataValue('movie_id'));
            res.json({
                banner,
                movie: movie ? movie : null
            });
        } else {
            res.json(null);
        }
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener banner', error });
    }
};

// Create or Update Banner
export const updateBanner = async (req: Request, res: Response) => {
    const { movie_id } = req.body;
    const file = req.file;

    console.log('updateBanner called with:', { movie_id, file: file ? { filename: file.filename, size: file.size } : 'NO_FILE' });

    try {
        // Validate both movie_id and file are present
        if (!movie_id) {
            console.error('No movie_id provided');
            if (file) {
                try {
                    fs.unlinkSync(file.path);
                } catch (e) {
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
        const movie = await Movie.findByPk(movie_id);
        if (!movie) {
            console.error('Movie not found:', movie_id);
            // Clean up uploaded file if movie invalid
            try {
                fs.unlinkSync(file.path);
            } catch (e) {
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
        await HomeBanner.update({ active: false }, { where: { active: true } });

        console.log('Creating new banner with:', { movie_id, filename: file.filename });
        // Create new banner with the custom image filename
        const newBanner = await HomeBanner.create({
            movie_id: parseInt(movie_id as string),
            custom_image: file.filename,
            active: true
        });

        console.log('Banner created successfully:', newBanner.toJSON());
        res.json({ 
            msg: 'Banner actualizado con éxito',
            banner: newBanner
        });

    } catch (error: any) {
        console.error('Exception in updateBanner:', error);
        if (req.file) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (e) {
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
