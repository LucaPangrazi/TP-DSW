"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clasificaiones = exports.Formatos = exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles["Admin"] = "ADMIN";
    Roles["User"] = "USER";
})(Roles || (exports.Roles = Roles = {}));
var Formatos;
(function (Formatos) {
    Formatos["DosD"] = "2D";
    Formatos["TresD"] = "3D";
})(Formatos || (exports.Formatos = Formatos = {}));
var clasificaiones;
(function (clasificaiones) {
    clasificaiones["Everyone"] = "EVERYONE";
    clasificaiones["Pegi3"] = "PEGI3";
    clasificaiones["Pegi7"] = "PEGI7";
    clasificaiones["Pegi13"] = "PEGI13";
    clasificaiones["Teen"] = "TEEN";
    clasificaiones["Mature"] = "MATURE";
    clasificaiones["RRated"] = "RRATED";
})(clasificaiones || (exports.clasificaiones = clasificaiones = {}));
