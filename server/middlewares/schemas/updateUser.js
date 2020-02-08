import Joi from '@hapi/joi';

export default Joi.object().keys({
  municipioId: Joi.number().required(),
  nombre: Joi.string()
    .trim()
    .not()
    .empty()
    .required(),
  apPaterno: Joi.string()
    .trim()
    .not()
    .empty()
    .required(),
  apMaterno: Joi.string()
    .trim()
    .not()
    .empty()
    .required(),
  direccion: Joi.string()
    .trim()
    .not()
    .empty()
    .required(),
  email: Joi.string()
    .trim()
    .email()
    .not()
    .empty(),
  numCelular: Joi.string()
    .trim()
    .not()
    .empty()
    .min(10)
    .max(10)
    .regex(/^[0-9]+$/)
});
