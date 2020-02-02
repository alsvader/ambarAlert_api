import db from '../config/db';

const models = {
  CatCabello: db.import('./catCabello'),
  CatOjos: db.import('./catOjos'),
  Denuncia: db.import('./denuncia'),
  Dependencia: db.import('./dependencia'),
  DependenciaDenuncia: db.import('./dependenciaDenuncia'),
  Estado: db.import('./estado'),
  FotosHijo: db.import('./fotosHijo'),
  Hijo: db.import('./hijo'),
  Municipio: db.import('./municipio'),
  Persona: db.import('./persona'),
  Rol: db.import('./rol'),
  SeguimientoDenuncia: db.import('./seguimientoDenuncia'),
  Estatus: db.import('./estatus'),
  Usuario: db.import('./usuario')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export default models;
