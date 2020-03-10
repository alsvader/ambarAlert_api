import models from '../models';
import logger from '../config/logger';

const getAll = async (req, res) => {
  try {
    const denuncias = await models.Denuncia.findAll({
      include: [
        { model: models.Usuario },
        { model: models.Hijo },
        { model: models.Municipio },
        { model: models.Estatus }
      ],
      where: {
        estatusId: 2
      }
    });
    res.send(denuncias);
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

const createDenuncia = async (req, res) => {
  try {
    const { body } = req;

    const municipio = await models.Municipio.findByPk(body.municipioId);

    if (!municipio) return res.status(404).send('Municipio not found');

    const user = await models.Usuario.findByPk(body.usuarioId);

    if (!user) return res.status(404).send('User not found');

    const child = await models.Hijo.findByPk(body.hijoId);

    if (!child) return res.status(404).send('Child not found');

    if (child.usuarioId !== user.id)
      return res
        .status(404)
        .send('The child you gave does not belong to the user');

    const denuncia = await models.Denuncia.create({
      municipioId: body.municipioId,
      usuarioId: body.usuarioId,
      hijoId: body.hijoId,
      estatusId: 1,
      latitud: body.latitud,
      longitud: body.longitud,
      descripcion: body.descripcion,
      vestuario: body.vestuario,
      fechaDesaparecio: body.fechaDesaparecio,
      direccionDesaparecio: body.direccionDesaparecio
    });

    res.send(denuncia);
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

const updateDenuncia = async (req, res) => {
  try {
    const { params, body } = req;

    const denuncia = await models.Denuncia.findByPk(params.denunciaId);

    if (!denuncia) return res.status(404).send('Denuncia not found');

    const municipio = await models.Municipio.findByPk(body.municipioId);

    if (!municipio) return res.status(404).send('Municipio not found');

    const user = await models.Usuario.findByPk(body.usuarioId);

    if (!user) return res.status(404).send('User not found');

    const child = await models.Hijo.findByPk(body.hijoId);

    if (!child) return res.status(404).send('Child not found');

    if (child.usuarioId !== user.id)
      return res
        .status(404)
        .send('The child you gave does not belong to the user');

    denuncia.municipioId = body.municipioId;
    denuncia.usuarioId = body.usuarioId;
    denuncia.hijoId = body.hijoId;
    denuncia.latitud = body.latitud;
    denuncia.longitud = body.longitud;
    denuncia.descripcion = body.descripcion;
    denuncia.vestuario = body.vestuario;
    denuncia.fechaDesaparecio = body.fechaDesaparecio;
    denuncia.direccionDesaparecio = body.direccionDesaparecio;
    await denuncia.save();

    res.send(denuncia);
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

const changeStatus = async (req, res) => {
  try {
    const { params } = req;

    const denuncia = await models.Denuncia.findByPk(params.denunciaId);

    if (!denuncia) return res.status(404).send('Denuncia not found');

    const status = await models.Estatus.findOne({
      where: {
        id: params.statusId,
        statusDeleted: 0
      }
    });

    if (!status) return res.status(404).send('Estatus not found');

    denuncia.estatusId = status.id;
    await denuncia.save();

    res.send(denuncia);
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

export { getAll, createDenuncia, updateDenuncia, changeStatus };
