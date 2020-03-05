import path from 'path';
import logger from '../config/logger';
import models from '../models';

const fs = require('fs').promises;

const getById = async (req, res) => {
  try {
    const { params } = req;

    const child = await models.Hijo.findOne({
      include: [{ model: models.CatOjos }, { model: models.CatCabello }],
      where: {
        id: params.childId,
        statusDeleted: false
      }
    });

    if (!child) return res.status(404).send('Child not found');

    res.send(child);
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

const createChild = async (req, res) => {
  try {
    const { body } = req;

    const user = await models.Usuario.findOne({
      where: {
        id: body.idPadre,
        statusDeleted: false
      }
    });

    if (!user) return res.status(404).send('User not found');

    const cabello = await models.CatCabello.findOne({
      where: {
        id: body.idCabello,
        statusDeleted: false
      }
    });

    if (!cabello) return res.status(404).send('Cat cabello not found');

    const ojos = await models.CatOjos.findOne({
      where: {
        id: body.idOjos,
        statusDeleted: false
      }
    });

    if (!ojos) return res.status(404).send('Cat ojos not found');

    const child = await models.Hijo.create({
      nombre: body.nombre,
      apPaterno: body.apPaterno,
      apMaterno: body.apMaterno,
      fechaNacimiento: body.fechaNacimiento,
      genero: body.genero,
      estatura: body.estatura,
      peso: body.peso,
      discapacidad: body.discapacidad,
      padecimiento: body.padecimiento,
      seniaParticular: body.seniaParticular,
      catCabelloId: body.idCabello,
      catOjoId: body.idOjos,
      usuarioId: body.idPadre
    });
    res.send(child);
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

const updateChild = async (req, res) => {
  try {
    const { body, params } = req;

    const user = await models.Usuario.findOne({
      where: {
        id: body.idPadre,
        statusDeleted: false
      }
    });

    if (!user) return res.status(404).send('User not found');

    const cabello = await models.CatCabello.findOne({
      where: {
        id: body.idCabello,
        statusDeleted: false
      }
    });

    if (!cabello) return res.status(404).send('Cat cabello not found');

    const ojos = await models.CatOjos.findOne({
      where: {
        id: body.idOjos,
        statusDeleted: false
      }
    });

    if (!ojos) return res.status(404).send('Cat ojos not found');

    const child = await models.Hijo.findOne({
      where: {
        id: params.childId,
        statusDeleted: false
      }
    });

    if (!child) return res.status(404).send('Child not found');

    child.nombre = body.nombre;
    child.apPaterno = body.apPaterno;
    child.apMaterno = body.apMaterno;
    child.fechaNacimiento = body.fechaNacimiento;
    child.genero = body.genero;
    child.estatura = body.estatura;
    child.peso = body.peso;
    child.discapacidad = body.discapacidad;
    child.padecimiento = body.padecimiento;
    child.seniaParticular = body.seniaParticular;
    child.catCabelloId = body.idCabello;
    child.catOjoId = body.idOjos;
    child.usuarioId = body.idPadre;
    await child.save();

    res.send('Child has been updated');
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

const deleteChild = async (req, res) => {
  try {
    const { params } = req;

    const child = await models.Hijo.findOne({
      where: {
        id: params.childId,
        statusDeleted: false
      }
    });

    if (!child) return res.status(404).send('Child not found');

    child.statusDeleted = true;
    await child.save();

    res.send('Child has been deleted');
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

const uploadActa = async (req, res) => {
  try {
    logger.info(JSON.stringify(req.file, {}, 2));

    const { params } = req;

    const child = await models.Hijo.findOne({
      where: {
        id: params.childId,
        statusDeleted: false
      }
    });

    if (!child) {
      const resolve = await fs.unlink(req.file.path);
      logger.info(resolve);
      return res.status(404).send('Child not found');
    }

    if (child.actaNacimiento !== null) {
      await fs.unlink(
        path.join(__dirname, `../public/uploads/${child.actaNacimiento}`)
      );
    }

    child.actaNacimiento = req.file.filename;
    await child.save();

    res.send('uploaded');
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

const uploadCurp = async (req, res) => {
  try {
    logger.info(JSON.stringify(req.file, {}, 2));

    const { params } = req;

    const child = await models.Hijo.findOne({
      where: {
        id: params.childId,
        statusDeleted: false
      }
    });

    if (!child) {
      const resolve = await fs.unlink(req.file.path);
      logger.info(resolve);
      return res.status(404).send('Child not found');
    }

    if (child.curp !== null) {
      await fs.unlink(path.join(__dirname, `../public/uploads/${child.curp}`));
    }

    child.curp = req.file.filename;
    await child.save();

    res.send('uploaded');
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

const uploadProfile = async (req, res) => {
  try {
    const { params } = req;

    const child = await models.Hijo.findOne({
      where: {
        id: params.childId,
        statusDeleted: false
      }
    });

    if (!child) {
      const resolve = await fs.unlink(req.file.path);
      logger.info(resolve);
      return res.status(404).send('Child not found');
    }

    if (child.foto !== null) {
      await fs.unlink(path.join(__dirname, `../public/uploads/${child.foto}`));
    }

    child.foto = req.file.filename;
    await child.save();

    res.send('uploaded');
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

const uploadGallery = async (req, res) => {
  try {
    const { params } = req;

    const child = await models.Hijo.findOne({
      where: {
        id: params.childId,
        statusDeleted: false
      }
    });

    if (!child) {
      req.files.forEach(async element => {
        await fs.unlink(element.path);
      });
      return res.status(404).send('Child not found');
    }

    let i;
    const results = [];
    for (i = 0; i < req.files.length; i += 1) {
      const image = models.FotosHijo.create({
        foto: req.files[i].filename,
        hijoId: params.childId
      });
      results.push(image);
    }

    const response = await Promise.all(results);
    logger.info(JSON.stringify(response, {}, 2));

    res.send(response);
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

export {
  getById,
  createChild,
  updateChild,
  deleteChild,
  uploadActa,
  uploadCurp,
  uploadProfile,
  uploadGallery
};
