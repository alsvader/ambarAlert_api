import bcrypt from 'bcrypt';
import phoneNumberToken from 'generate-sms-verification-code';
import logger from '../config/logger';
import models from '../models';
import { getEmailTemplate, sendMail } from '../utils/email';

const createUser = async (req, res) => {
  try {
    const { body } = req;

    const saltRounds = 10;
    const hashPasword = await bcrypt.hash(body.password, saltRounds);

    const userFound = await models.Usuario.findOne({
      where: {
        email: body.email
      }
    });

    if (userFound)
      return res
        .status(400)
        .send('You cannot create more than one user with the same email');

    const user = await models.Usuario.create({
      numCelular: body.numCelular,
      email: body.email,
      passwd: hashPasword,
      lastLogin: new Date(),
      rolId: 2
    });

    const response = {
      id: user.id,
      email: user.email,
      numCelular: user.numCelular,
      rolId: user.rolId,
      lastLogin: user.lastLogin
    };
    return res.send(response);
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

const login = async (req, res) => {
  try {
    const { body } = req;

    const user = await models.Usuario.findOne({
      include: [
        { model: models.Persona },
        { model: models.Rol },
        {
          model: models.Hijo,
          include: [
            { model: models.CatOjos },
            { model: models.CatCabello },
            { model: models.FotosHijo }
          ]
        },
        { model: models.Denuncia }
      ],
      where: {
        email: body.email
      }
    });

    logger.info(JSON.stringify(user));

    if (!user) res.status(400).send('User not found');

    const isSamePass = await bcrypt.compare(body.password, user.passwd);

    if (!isSamePass) res.status(500).send('Email or password incorrect');

    let generatedToken = phoneNumberToken(5);

    if (generatedToken.length < 5) {
      generatedToken += Math.floor(Math.random() * 10);
    }

    const content = `
      <p>Tu código de confirmación es:</p>
      <h2>${generatedToken}</h2>
    `;

    const emailTemplate = await getEmailTemplate(content, 'email');
    await sendMail(
      user.email,
      'Alerta amber - Código de confirmación',
      emailTemplate
    );

    user.lastLogin = new Date();
    user.codigoConfirmacion = generatedToken;
    await user.save();

    const response = {
      id: user.id,
      email: user.email,
      numCelular: user.numCelular,
      rolId: user.rolId,
      lastLogin: user.lastLogin,
      children: user.hijos
    };

    res.send(response);
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

const validateCode = async (req, res) => {
  try {
    const { body } = req;

    const user = await models.Usuario.findOne({
      where: {
        id: body.userId
      }
    });

    if (!user) return res.status(404).send('User not found');

    if (body.code !== user.codigoConfirmacion)
      return res.status(400).send('The code you provided is not valid');

    user.codigoConfirmacion = null;
    await user.save();

    res.send('Code confirmation validated');
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

const changePassword = async (req, res) => {
  try {
    const { body, params } = req;

    const user = await models.Usuario.findOne({
      where: {
        id: params.userId,
        statusDeleted: false
      }
    });

    if (!user) return res.status(404).send('User not found');

    const isSamePass = await bcrypt.compare(body.currentPassword, user.passwd);

    if (!isSamePass) res.status(500).send('Password is not valid');

    const hash = await bcrypt.hash(body.newPassword, 10);

    user.passwd = hash;
    await user.save();

    res.send('Password has been changed');
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

const updateUser = async (req, res) => {
  try {
    const { body, params } = req;

    const user = await models.Usuario.findOne({
      include: [
        {
          model: models.Persona
        }
      ],
      where: {
        id: params.userId,
        statusDeleted: false
      }
    });

    if (!user) return res.status(404).send('User not found');

    const municipio = await models.Municipio.findByPk(body.municipioId);

    if (!municipio) return res.status(404).send('Municipio not found');

    const email = body.email === undefined ? null : body.email;
    const numCelular = body.numCelular === undefined ? null : body.numCelular;

    if (user.email !== email) {
      const emailIsUsed = await models.Usuario.findOne({
        where: { email }
      });

      if (emailIsUsed)
        return res
          .status(400)
          .send('You cannot use the same email for two users');
    }

    user.email = email !== null ? email : user.email;
    user.numCelular = numCelular !== null ? numCelular : user.numCelular;
    await user.save();

    if (user.persona === null) {
      await models.Persona.create({
        id: user.id,
        municipioId: body.municipioId,
        nombre: body.nombre,
        apPaterno: body.apPaterno,
        apMaterno: body.apMaterno,
        direccion: body.direccion
      });
    } else {
      await models.Persona.update(
        {
          municipioId: body.municipioId,
          nombre: body.nombre,
          apPaterno: body.apPaterno,
          apMaterno: body.apMaterno,
          direccion: body.direccion
        },
        { where: { id: user.id } }
      );
    }

    res.send('User has been updated');
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

export { createUser, login, validateCode, changePassword, updateUser };
