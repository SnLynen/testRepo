import Usuario from '../models/usuario';

export const index = async (req, res) => {
    const usuarios = await Usuario.findAll({});
    res.json({ data: usuarios.map((usuario) => usuario.toJSON()) });
};

export const show = async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
        res.json({ data: usuario.toJSON() });
    } else {
        res
            .status(404)
            .json({ message: `No se encontro el usuario con el id ${req.params.id}` });
    }
};

export const update = async (req, res) => {
    try {
        if (req.body.name !== undefined) {
            const usuario = await Usuario.findByPk(req.params.id);
            usuario.name = req.body.name;
            usuario.direccion = req.body.direccion;
            usuario.dni = req.body.dni;
            usuario.pass = req.body.pass;
            usuario.telefono = req.body.telefono;
            usuario.idRol = req.body.idRol;
            await usuario.save();
            res.status(200).send({ id: usuario.id });
        } else {
            res.status(400).json('Nombre no recibido');
        }
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const create = async (req, res) => {

    try {
        if (req.body.name !== undefined) {
            const usuario = await Usuario.create({ name: req.body.name, direccion: req.body.direccion, dni: req.body.dni, pass: req.body.pass, telefono: req.body.telefono, idRol: req.body.idRol });
            res.status(200).send({ id: usuario.id });
        }
        else {
            res.status(400).json('Nombre no recibido');
        }
    } catch (err) {
        return res.status(500).send(err);
    }
};