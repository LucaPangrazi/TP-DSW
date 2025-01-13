import User from '../models/user.entity.js';
const jwt = require('jsonwebtoken');
export const allUsers = async (req, res) => {
    const users = await User.findAll();
    res.json({
        msg: `get funciona`,
        return: users
    });
};
export const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
};
export const newUser = async (req, res) => {
    const { nombre, apellido, userName, dni, telefono, password } = req.body;
    const user = await User.findOne({ where: { userName: userName } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con ese nombre de usuario registrado`
        });
    }
    try {
        await User.create({
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
export const loginUser = async (req, res) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ where: { userName: userName } });
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
    const token = jwt.sign({
        userName: userName
    }, process.env.SECRET_KEY ?? 'ClaveSuperSegura1234');
    res.json(token);
};
export const editUser = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
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
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(400).json({
            msg: `No existe el usuario`
        });
    }
    else {
        await user.destroy();
    }
};
//# sourceMappingURL=user.controler.js.map