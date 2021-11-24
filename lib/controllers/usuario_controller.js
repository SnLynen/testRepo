import Usuario from '../models/usuario';
import Rol from '../models/rol';

export const index = async (req, res) => {
    const usuarios = await Usuario.findAll({});
    //Recorre el MAP en busca de Id para reemplazar
    const records = usuarios.map(function (result) {
        return result.dataValues;
    })
    for (let i = 0; i <= records.length - 1; i++) {
        records[i].idRol = await Rol.findByPk(records[i].idRol);
    };
    res.json({ data: records });
};

export const show = async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
        const user = usuario.toJSON();
        user.idRol = await Rol.findByPk(user.idRol);
        res.json({ data: user });
    } else {
        res
            .status(404)
            .json({ message: `No se encontro el usuario con el id ${req.params.id}` });
    }
};

export const update = async (req, res) => {
    try {
        const usr = req.body;
        if (usr.name !== undefined && usr.direccion !== undefined && usr.dni !== undefined && usr.pass !== undefined && usr.telefono !== undefined && usr.idRol !== undefined) {
            const usuario = await Usuario.findByPk(req.params.id);
            usuario.name = req.body.name;
            usuario.direccion = req.body.direccion;
            usuario.dni = req.body.dni;
            usuario.pass = req.body.pass;
            usuario.telefono = req.body.telefono;
            usuario.idRol = req.body.idRol;
            await usuario.save();
            res.status(200).send({ id: usuario.id });
        } else if (usr.name == undefined) {
            res.status(400).json('Nombre no recibido');
        } else if (usr.direccion == undefined) {
            res.status(400).json('Direccion no recibida');
        } else if (usr.dni == undefined) {
            res.status(400).json('DNI no recibido');
        } else if (usr.pass == undefined) {
            res.status(400).json('Contrasenia no recibida');
        } else if (usr.telefono == undefined) {
            res.status(400).json('Telefono no recibido');
        } else if (usr.idRol == undefined) {
            res.status(400).json('idRol no recibido');
        }
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const create = async (req, res) => {

    try {
        const usr = req.body;
        if (usr.name !== undefined && usr.direccion !== undefined && usr.dni !== undefined && usr.pass !== undefined && usr.telefono !== undefined && usr.idRol !== undefined) {
            const usuario = await Usuario.create({ name: req.body.name, direccion: req.body.direccion, dni: req.body.dni, pass: req.body.pass, telefono: req.body.telefono, idRol: req.body.idRol });
            res.status(200).send({ id: usuario.id });
        }
        else if (usr.name == undefined) {
            res.status(400).json('Nombre no recibido');
        } else if (usr.direccion == undefined) {
            res.status(400).json('Direccion no recibida');
        } else if (usr.dni == undefined) {
            res.status(400).json('DNI no recibido');
        } else if (usr.pass == undefined) {
            res.status(400).json('Contrasenia no recibida');
        } else if (usr.telefono == undefined) {
            res.status(400).json('Telefono no recibido');
        } else if (usr.idRol == undefined) {
            res.status(400).json('idRol no recibido');
        }
    } catch (err) {
        return res.status(500).send(err);
    }
};