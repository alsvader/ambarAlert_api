import Joi from '@hapi/joi';

export default Joi.object().keys({
  idPadre: Joi.number().required(),
  idCabello: Joi.number().required(),
  idOjos: Joi.number().required(),
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
  fechaNacimiento: Joi.date()
    .not()
    .empty()
    .required(),
  genero: Joi.string()
    .trim()
    .not()
    .empty()
    .valid('Hombre', 'Mujer')
    .required(),
  estatura: Joi.string()
    .trim()
    .not()
    .empty()
    .required(),
  peso: Joi.string()
    .trim()
    .not()
    .empty()
    .required(),
  discapacidad: Joi.string()
    .trim()
    .not()
    .empty()
    .required(),
  padecimiento: Joi.string()
    .trim()
    .not()
    .empty()
    .required(),
  seniaParticular: Joi.string()
    .trim()
    .not()
    .empty()
    .required()
});
