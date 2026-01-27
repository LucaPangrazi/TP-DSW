"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const funcion_1 = __importDefault(require("./funcion"));
const movie_1 = __importDefault(require("./movie"));
const sala_1 = __importDefault(require("./sala"));
const sucursal_1 = __importDefault(require("./sucursal"));
// Associations
funcion_1.default.belongsTo(movie_1.default, { foreignKey: 'movie_id' });
funcion_1.default.belongsTo(sala_1.default, { foreignKey: 'sala_id' });
funcion_1.default.belongsTo(sucursal_1.default, { foreignKey: 'sucursal_id' });
//# sourceMappingURL=associations.js.map