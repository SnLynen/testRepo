import Materia from '../models/materia';
import Carrera from '../models/carrera'

export const index = async (req, res) => {
    const materias = await Materia.findAll({});
    //Recorre el MAP en busca de Id para reemplazar
    const records = materias.map(function (result) {
        return result.dataValues;
    })
    for (let i = 0; i <= records.length - 1; i++) {
        records[i].idCarrera = await Carrera.findByPk(records[i].idCarrera);
    };
    res.json({ data: records });
};

export const show = async (req, res) => {
    const materia = await Materia.findByPk(req.params.id);
    if (materia) {
        const mat = materia.toJSON();
        mat.idCarrera = await Carrera.findByPk(mat.idCarrera);
        res.json({ data: mat });
    } else {
        res
            .status(404)
            .json({ message: `No se encontro la materia con el id ${req.params.id}` });
    }
};

export const update = async (req, res) => {
    try {
        if (req.body.name !== undefined && req.body.idCarrera !== undefined) {
            const materia = await Materia.findByPk(req.params.id);
            materia.name = req.body.name;
            materia.idCarrera = req.body.idCarrera;
            await materia.save();
            res.status(200).send({ id: materia.id });
        } else if (req.body.name == undefined) {
            res.status(400).json('Nombre no recibido');
        } else if (req.body.idCarrera == undefined) {
            res.status(400).json('idCarrera no recibida');
        }
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const create = async (req, res) => {

    try {
        if (req.body.name !== undefined && req.body.idCarrera !== undefined) {
            const materia = await Materia.create({ name: req.body.name, idCarrera: req.body.idCarrera });
            res.status(200).send({ id: materia.id });
        }
        else if (req.body.name == undefined) {
            res.status(400).json('Nombre no recibido');
        }
        else if (req.body.idCarrera == undefined) {
            res.status(400).json('idCarrera no recibido');
        }
    } catch (err) {
        return res.status(500).send(err);
    }
};