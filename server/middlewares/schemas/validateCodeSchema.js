import Joi from '@hapi/joi';

export default Joi.object().keys({
  userId: Joi.number().required(),
  code: Joi.string()
    .trim()
    .not()
    .empty()
    .max(5)
    .regex(/^[0-9]+$/)
    .required()
});
