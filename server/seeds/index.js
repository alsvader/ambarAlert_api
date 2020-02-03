import db from '../config/db';
import models from '../models';

import ESTADOS from './Estados';
import MUNICIPIOS from './Municipios';
import ROLES from './Roles';
import DEPENDENCIAS from './Dependencias';
import ESTATUS from './Estatus';
import CATCABELLOS from './CatCabellos';
import CATOJOS from './CatOjos';

const seeds = async () => {
  await db.sync({ force: true });

  await models.Estado.bulkCreate(ESTADOS);
  await models.Municipio.bulkCreate(MUNICIPIOS);
  await models.Rol.bulkCreate(ROLES);
  await models.Dependencia.bulkCreate(DEPENDENCIAS);
  await models.Estatus.bulkCreate(ESTATUS);
  await models.CatCabello.bulkCreate(CATCABELLOS);
  await models.CatOjos.bulkCreate(CATOJOS);
};

seeds();
