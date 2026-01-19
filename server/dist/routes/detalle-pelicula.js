"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalle_pelicula_1 = require("../controllers/detalle-pelicula");
const router = (0, express_1.Router)();
router.get('/:id', detalle_pelicula_1.getMovieById);
exports.default = router;
//# sourceMappingURL=detalle-pelicula.js.map