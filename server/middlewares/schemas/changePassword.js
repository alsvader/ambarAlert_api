import Joi from '@hapi/joi';

export default Joi.object().keys({
  currentPassword: Joi.string()
    .not()
    .empty()
    .required(),
  newPassword: Joi.string()
    .not()
    .empty()
    .min(8)
    .required(),
  repeatPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .strict()
});
