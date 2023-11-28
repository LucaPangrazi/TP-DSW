import { User } from '../models/user.entity.js';
export const allUsers = async (req, res) => {
    const users = await User.findAll();
    res.json({
        msg: `get funciona`,
        return: users
    });
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
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la base datos`
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
};
export const editUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });
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
        await user.save();
        res.json({
            msg: `Usuario ${username} actualizado exitosamente!`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        });
    }
};
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });
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