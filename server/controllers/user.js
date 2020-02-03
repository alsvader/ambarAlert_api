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

const loggin = async (req, res) => {
  try {
    res.send('loggin testing');
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

export { createUser, loggin };
