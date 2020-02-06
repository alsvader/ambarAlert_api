import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swagger-docs';
import routes from './routes';
import db from './config/db';
import logger from './config/logger';

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Test db connection
db.authenticate()
  .then(() => logger.info('Database connected...'))
  .catch(err => logger.info('Error DB => ', err));

const server = express();
server.use(morgan('dev'));
server.use(express.json());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
server.use('/api', routes);

module.exports = server;
