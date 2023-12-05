"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sucursal_1 = require("../controllers/sucursal");
const routerSuc = (0, express_1.Router)();
routerSuc.get('/', sucursal_1.getSucursales);
routerSuc.get('/:id', sucursal_1.getSucursal);
routerSuc.delete('/:id', sucursal_1.deleteSucursal);
routerSuc.post('/', sucursal_1.postSucursal);
routerSuc.put('/:id', sucursal_1.updateSucursal);
exports.default = routerSuc;
