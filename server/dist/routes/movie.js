"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_1 = require("../controllers/movie");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get('/', movie_1.getMovies);
router.get('/:id', movie_1.getMovie);
router.delete('/:id', movie_1.deleteMovie);
router.post('/', upload.single('image'), movie_1.saveMovie);
router.put('/:id', movie_1.updateMovie);
exports.default = router;
