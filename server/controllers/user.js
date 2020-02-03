import logger from '../config/logger';

const createUser = async (req, res) => {
  try {
    return res.send('Testing');
  } catch (error) {
    logger.error(error);
    res.status(500).send('An internal server error occurred');
  }
};

export { createUser };
