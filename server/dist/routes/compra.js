"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compra_1 = require("../controllers/compra");
const router = (0, express_1.Router)();
router.post('/:id/enviar-resumen', compra_1.enviarResumenCompra);
exports.default = router;
//# sourceMappingURL=compra.js.map