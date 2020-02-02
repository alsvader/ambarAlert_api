import db from '../config/db';

const models = {
  Rol: db.import('./rol')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export default models;
