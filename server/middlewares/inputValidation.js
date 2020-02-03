import logger from '../config/logger';
import chooseSchema from './schemas';

const inputValidation = schema => {
  return async (req, res, next) => {
    try {
      const schemaSelected = chooseSchema(schema);

      if (schemaSelected === null) {
        logger.error(`Invalid schema name: ${schema}`);
        return res.status(500).send('An intersal server error occured');
      }

      await schemaSelected.validateAsync(req.body);
      next();
    } catch (error) {
      logger.error(error);
      const response = { code: 500 };
      response.messages = error.details.map(item => item.message);
      return res.status(500).send(response);
    }
  };
};

export default inputValidation;
