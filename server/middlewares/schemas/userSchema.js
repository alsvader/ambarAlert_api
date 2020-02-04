import Joi from '@hapi/joi';

export default Joi.object().keys({
  email: Joi.string()
    .trim()
    .email()
    .not()
    .empty()
    .required(),
  password: Joi.string()
    .not()
    .empty()
    .min(8)
    .required(),
  numCelular: Joi.string()
    .not()
    .empty()
    .min(10)
    .max(10)
    .regex(/^[0-9]+$/)
    .required()
});
