import Sequelize from 'sequelize';
import keys from './keys';

const db = new Sequelize(keys.dbName, keys.dbUsername, keys.dbPassword, {
  host: keys.dbHost,
  dialect: 'mariadb'
});

export default db;
