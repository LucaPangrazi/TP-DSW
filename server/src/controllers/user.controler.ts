import { Request, Response } from 'express'
import User from '../models/user.entity.js'
import jwt from 'jsonwebtoken';


export const allUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();
    res.json({
        msg: `get funciona`,
        return: users
    })
}

export const getUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    const user = await User.findByPk(id)

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        })
    }

}

export const newUser = async (req: Request, res: Response) => {
    console.log('=== newUser called ===');
    console.log('Request body:', JSON.stringify(req.body));
    // Extraer los campos permitidos del body
    const { nombre, apellido, userName, dni, telefono, password, role } = req.body;

    // Evitar que el cliente envíe un id arbitrario; la BD generará el UUID

    const existing = await User.findOne({ where: { userName: userName } });

    if (existing) {
        return res.status(400).json({
            msg: `Ya existe un usuario con ese nombre de usuario registrado`
        })
    }

    // Determinar el rol final: por defecto 'User'. Permitir crear 'Admin' solo cuando
    // la solicitud incluya un token válido de una cuenta Admin.
    let finalRole = 'User';
    if (role && role === 'Admin') {
        // Verificar el header Authorization
        const headerToken = req.headers['authorization'];
        if (!headerToken || !headerToken.startsWith('Bearer ')) {
            return res.status(401).json({ msg: 'Se requiere token de administrador para asignar rol Admin' });
        }
        try {
            const bearerToken = headerToken.slice(7);
            const payload: any = jwt.verify(bearerToken, process.env.SECRET_KEY ?? 'ClaveSuperSegura1234');
            // Look up requesting user to verify role
            const reqUser = await User.findOne({ where: { userName: payload.userName } }) as any;
            if (!reqUser || (reqUser.role || reqUser.rol || '').toLowerCase() !== 'admin') {
                return res.status(403).json({ msg: 'Solo administradores pueden crear usuarios con rol Admin' });
            }
            finalRole = 'Admin';
        } catch (err) {
            return res.status(401).json({ msg: 'token no valido' });
        }
    }

    try {
        await User.create({
            nombre: nombre,
            apellido: apellido,
            userName: userName,
            dni: dni,
            telefono: telefono,
            password: password,
            role: finalRole
        })

        res.json({
            msg: `Usuario ${userName} creado exitosamente!`
        })
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({
            msg: `Upps ocurrio un error`,
            error
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {

    const { userName, password } = req.body;

    const user: any = await User.findOne({ where: { userName: userName } });

    if (!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${userName} en la base datos`
        })
    }
    let passwordValid = false;
    if (user.password === password) {
        passwordValid = true;
    }
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password Incorrecta`
        })
    }
    const token = jwt.sign({
        userName: userName
    }, process.env.SECRET_KEY ?? 'ClaveSuperSegura1234');

    res.json({
        token,
        user: {
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            userName: user.userName,
            role: user.role || user.rol, // Manejar posibles nombres de propiedades
            dni: user.dni,
            telefono: user.telefono
        }
    });
}


export const editUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params

    try {
        const user = await User.findByPk(id);

        if (user) {
            await user.update(body)
            res.json({
                msg: 'El usuario fue actualizado con exito'
            })

        } else {
            res.status(404).json({
                msg: `No existe un usuario con la id ${id}`
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Ups ocurrio un error comuniquese con soporte`
        })
    }

}

export const deleteUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(400).json({
            msg: `No existe el usuario`
        })
    }
    else {
        await user.destroy();
        res.json({ msg: 'Usuario eliminado' });
    }


}

