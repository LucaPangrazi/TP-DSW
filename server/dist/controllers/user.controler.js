"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.editUser = exports.loginUser = exports.newUser = exports.allUsers = void 0;
const user_entity_js_1 = require("../models/user.entity.js");
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_entity_js_1.User.findAll();
    res.json({
        msg: `get funciona`,
        return: users
    });
});
exports.allUsers = allUsers;
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, userName, dni, telefono, password, id } = req.body;
    const user = yield user_entity_js_1.User.findOne({ where: { userName: userName } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con ese nombre de usuario registrado`
        });
    }
    try {
        yield user_entity_js_1.User.create({
            nombre: nombre,
            apellido: apellido,
            userName: userName,
            dni: dni,
            telefono: telefono,
            password: password,
            id: id
        });
        res.json({
            msg: `Usuario ${userName} creado exitosamente!`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `Upps ocurrio un error`,
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    const user = yield user_entity_js_1.User.findOne({ where: { userName: userName } });
    if (!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${userName} en la base datos`
        });
    }
    var passwordValid = false;
    if (user.password === password) {
        passwordValid = true;
    }
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password Incorrecta`
        });
    }
    //const token = jwt.sign({ //
    // username: username //
    //}, process.env.SECRET_KEY ?? 'ClaveSuperSegura1234'); //
    // res.json(token); //
});
exports.loginUser = loginUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_entity_js_1.User.findOne({ where: { id: id } });
    const { username, telefono, password } = req.body;
    if (!user) {
        return res.status(400).json({
            msg: `No existe el usuario`
        });
    }
    try {
        user.userName = username;
        user.telefono = telefono;
        user.password = password;
        yield user.save();
        res.json({
            msg: `Usuario ${userName} actualizado exitosamente!`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        });
    }
});
exports.editUser = editUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_entity_js_1.User.findOne({ where: { id: id } });
    if (!user) {
        return res.status(400).json({
            msg: `No existe el usuario`
        });
    }
    else {
        yield user.destroy();
    }
});
exports.deleteUser = deleteUser;
