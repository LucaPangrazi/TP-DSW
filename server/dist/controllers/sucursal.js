import Sucursal from '../models/sucursal';
export const getSucursales = async (req, res) => {
    try {
        const listSucursales = await Sucursal.findAll();
        res.json(listSucursales);
    }
    catch (error) {
        console.error('Error al obtener sucursales:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};
export const getSucursal = async (req, res) => {
    const { id } = req.params;
    const sucursal = await Sucursal.findByPk(id);
    if (sucursal) {
        res.json(sucursal);
    }
    else {
        res.status(404).json({
            msg: `No existe una sucursal con el id ${id}`
        });
    }
};
export const deleteSucursal = async (req, res) => {
    const { id } = req.params;
    const sucursal = await Sucursal.findByPk(id);
    if (!sucursal) {
        res.status(404).json({
            msg: `No existe una sucursal con el id ${id}`
        });
    }
    else {
        await sucursal.destroy();
        res.json({
            msg: 'La sucursal fue eliminada con exito!'
        });
    }
};
export const postSucursal = async (req, res) => {
    const { body } = req;
    try {
        await Sucursal.create(body);
        res.json({
            msg: `La sucursal fue agregada con exito!`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Ups ocurrio un error comuniquese con soporte`
        });
    }
};
export const updateSucursal = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const sucursal = await Sucursal.findByPk(id);
        if (sucursal) {
            await sucursal.update(body);
            res.json({
                msg: 'La sucursal fue actualizada con exito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe una sucursal con el id ${id}`
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
//# sourceMappingURL=sucursal.js.map