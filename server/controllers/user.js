import bcrypt from 'bcrypt';
import logger from '../config/logger';
import models from '../models';

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
      where: {
        email: body.email
      }
    });

    if (!user) res.status(400).send('User not found');

    const isSamePass = await bcrypt.compare(body.password, user.passwd);

    if (!isSamePass) res.status(500).send('Email or password incorrect');

    user.lastLogin = new Date();
    user.save();

    const response = {
      email: user.email,
      numCelular: user.numCelular,
      rolId: user.rolId,
      lastLogin: user.lastLogin
    };

    res.send(response);
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

export { createUser, login };
