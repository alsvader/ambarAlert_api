import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import routes from './routes';
import db from './config/db';
import logger from './config/logger';

// Test db connection
db.authenticate()
  .then(() => logger.info('Database connected...'))
  .catch(err => logger.info('Error DB => ', err));

const server = express();
server.use(morgan('dev'));
server.use(express.json());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use('/api', routes);

module.exports = server;
