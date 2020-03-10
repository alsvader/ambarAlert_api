import Joi from '@hapi/joi';

export default Joi.object({
  municipioId: Joi.number().required(),
  usuarioId: Joi.number().required(),
  hijoId: Joi.number().required(),
  latitud: Joi.string()
    .trim()
    .not()
    .empty()
    .required(),
  longitud: Joi.string()
    .trim()
    .not()
    .empty()
    .required(),
  descripcion: Joi.string()
    .trim()
    .not()
    .empty()
    .required(),
  vestuario: Joi.string()
    .trim()
    .not()
    .empty()
    .required(),
  fechaDesaparecio: Joi.date()
    .not()
    .empty()
    .required(),
  direccionDesaparecio: Joi.string()
    .trim()
    .not()
    .empty()
    .required()
});
