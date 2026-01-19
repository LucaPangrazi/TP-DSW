"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.editUser = exports.loginUser = exports.newUser = exports.getUser = exports.allUsers = void 0;
const user_entity_js_1 = __importDefault(require("../models/user.entity.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const allUsers = async (req, res) => {
    const users = await user_entity_js_1.default.findAll();
    res.json({
        msg: `get funciona`,
        return: users
    });
};
exports.allUsers = allUsers;
const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await user_entity_js_1.default.findByPk(id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
};
exports.getUser = getUser;
const newUser = async (req, res) => {
    const { nombre, apellido, userName, dni, telefono, password } = req.body;
    const user = await user_entity_js_1.default.findOne({ where: { userName: userName } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con ese nombre de usuario registrado`
        });
    }
    try {
        await user_entity_js_1.default.create({
            nombre: nombre,
            apellido: apellido,
            userName: userName,
            dni: dni,
            telefono: telefono,
            password: password
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
};
exports.newUser = newUser;
const loginUser = async (req, res) => {
    const { userName, password } = req.body;
    const user = await user_entity_js_1.default.findOne({ where: { userName: userName } });
    if (!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${userName} en la base datos`
        });
    }
    let passwordValid = false;
    if (user.password === password) {
        passwordValid = true;
    }
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password Incorrecta`
        });
    }
    const token = jsonwebtoken_1.default.sign({
        userName: userName
    }, process.env.SECRET_KEY ?? 'ClaveSuperSegura1234');
    res.json({
        token,
        user: {
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            userName: user.userName,
            role: user.role || user.rol,
            dni: user.dni,
            telefono: user.telefono
        }
    });
};
exports.loginUser = loginUser;
const editUser = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const user = await user_entity_js_1.default.findByPk(id);
        if (user) {
            await user.update(body);
            res.json({
                msg: 'El usuario fue actualizado con exito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un usuario con la id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Ups ocurrio un error comuniquese con soporte`
        });
    }
};
exports.editUser = editUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await user_entity_js_1.default.findByPk(id);
    if (!user) {
        return res.status(400).json({
            msg: `No existe el usuario`
        });
    }
    else {
        await user.destroy();
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controler.js.map