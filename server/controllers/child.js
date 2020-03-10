import path from 'path';
import fs from 'fs';
import logger from '../config/logger';
import models from '../models';

const getById = async (req, res) => {
  try {
    const { params } = req;

    const child = await models.Hijo.findOne({
      include: [
        { model: models.CatOjos },
        { model: models.CatCabello },
        { model: models.FotosHijo }
      ],
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
      fs.unlinkSync(req.file.path);
      return res.status(404).send('Child not found');
    }

    const filename =
      child.actaNacimiento === null || child.actaNacimiento === ''
        ? null
        : child.actaNacimiento;

    const pathFile = path.resolve(__dirname, `../public/uploads/${filename}`);
    logger.info(pathFile);

    if (fs.existsSync(pathFile)) {
      fs.unlinkSync(pathFile);
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
      fs.unlinkSync(req.file.path);
      return res.status(404).send('Child not found');
    }

    const filename =
      child.curp === null || child.curp === '' ? null : child.curp;

    const pathFile = path.resolve(__dirname, `../public/uploads/${filename}`);
    logger.info(pathFile);

    if (fs.existsSync(pathFile)) {
      fs.unlinkSync(pathFile);
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
      fs.unlinkSync(req.file.path);
      return res.status(404).send('Child not found');
    }

    const filename =
      child.foto === null || child.foto === '' ? null : child.foto;

    const pathFile = path.resolve(__dirname, `../public/uploads/${filename}`);
    logger.info(pathFile);

    if (fs.existsSync(pathFile)) {
      fs.unlinkSync(pathFile);
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
      fs.unlinkSync(req.file.path);
      return res.status(404).send('Child not found');
    }

    const image = await models.FotosHijo.create({
      foto: req.file.filename,
      hijoId: params.childId
    });

    res.send(image);
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
